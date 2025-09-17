package nextdoor.project.user.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nextdoor.project.user.User;
import nextdoor.project.user.dto.UserIdFindDto;
import nextdoor.project.user.dto.UserDto;
import nextdoor.project.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    // 회원 목록
    @GetMapping
    public String list(Model model, HttpSession session) {
        List<User> users = userService.findAll();
        model.addAttribute("users", users);

        model.addAttribute("loginUserId", session.getAttribute("loginUserId"));
        return "user/list";
    }

    // 회원가입 보여주기
    @GetMapping("/join")
    public String joinForm(Model model) {
        model.addAttribute("userForm", new UserDto());
        return "user/join";
    }

    // 회원가입 + 검증 + 비밀번호 확인
    @PostMapping("/join")
    public String joinSubmit(
            @Valid @ModelAttribute UserDto userDto,
            BindingResult bindingResult,
            Model model,
            HttpSession session) {

        // 비밀번호와 확인 일치 여부 검사
        if (!userDto.getPassword().equals(userDto.getCheckPassword())) {
            bindingResult.rejectValue("checkPassword", "passwordNotMatch", "비밀번호가 일치하지 않습니다.");
        }

        if (bindingResult.hasErrors()) {
            // 에러 있을 때 다시 폼으로
            return "user/join";
        }

        // 회원가입 수행
        User user = new User(
                userDto.getUserId(),
                userDto.getPassword(),
                userDto.getName(),
                userDto.getEmail()
        );
        userService.save(user);

        session.setAttribute("loginUserId", user.getUserId());

        return "redirect:/users";
    }

    // 회원 조회
    @GetMapping("/{userId}")
    public String detail(@PathVariable String userId, Model model) {
        User user = userService.findById(userId);
        model.addAttribute("user", user);
        return "user/detail";
    }

    // 이메일 찾기
    @GetMapping("/find")
    public User findByEmailAndName(@RequestParam String email, @RequestParam String name) {
        return userService.findByEmailAndName(email, name);
    }

    // 아이디 찾기 폼
    @GetMapping("/findId")
    public String findIdForm(Model model) {
        model.addAttribute("userIdFindDto", new UserIdFindDto());
        return "user/findIdForm";
    }

    // 아이디 찾기
    @PostMapping("/findId")
    public String findId(@Valid @ModelAttribute UserIdFindDto userIdFindDto, BindingResult bindingResult, Model model) {
        User result = userService.findByEmailAndName(userIdFindDto.getEmail(), userIdFindDto.getName());

        if (bindingResult.hasErrors()) {
            return "user/findIdForm";
        }

        if (result == null) {
            bindingResult.reject("idFindCheck", "일치하는 회원이 없습니다.");
            return "user/findIdForm";
        }

        model.addAttribute("findId", result.getUserId());
        return "user/findIdForm";
    }

    //비밀번호 변경
    @GetMapping("/{userId}/password")
    public String changePasswordForm(@PathVariable String userId, Model model) {
        model.addAttribute("userId", userId);
        return "user/changePassword";
    }

    //비밀번호 변경 처리
    @PostMapping("/{userId}/password")
    public String changePassword(@PathVariable String userId,
                                 @RequestParam String newPassword,
                                 @RequestParam String checkPassword,
                                 Model model) {

        if (!newPassword.equals(checkPassword)) {
            model.addAttribute("errorMessage", "비밀번호가 일치하지 않습니다.");
            model.addAttribute("userId", userId);
            return "user/changePassword";
        }

        userService.changePassword(userId, newPassword);
        return "redirect:/users/" + userId;
    }

    // 회원 삭제
    @PostMapping("/{userId}/delete")
    public String deleteUser(@PathVariable String userId) {
        userService.delete(userId);
        return "redirect:/users";
    }

    // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/users";
    }
}