package nextdoor.project.mypage.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import nextdoor.project.board.Board;
import nextdoor.project.board.repository.BoardRepository;
import nextdoor.project.plan.Plan;
import nextdoor.project.plan.repository.PlanRepository;
import nextdoor.project.user.User;
import nextdoor.project.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {
    private final UserService userService;
    private final PlanRepository planRepository;
    private final BoardRepository boardRepository;

    @GetMapping
    public String myPage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return "redirect:/login";
        }
        String findUserId = (String) session.getAttribute("userId");
        if (findUserId == null) {
            return "redirect:/login";
        }

        User user = userService.findById(findUserId);
        if (user == null) {
            return "redirect:/login";
        }

        List<Plan> plan = planRepository.findByUser(user); // 내 여행계획
        List<Board> post = boardRepository.findByWriter(user); // 내가 쓴글

        model.addAttribute("member", user);
        model.addAttribute("plans", plan);
        model.addAttribute("post", post);
        return "mypage/myPage";
    }

    // 이름 변경 폼
    @GetMapping("/change-name")
    public String myPageChangeNameForm() {
        return "mypage/change-name";
    }

    // 이름 변경 처리
    @PostMapping("/change-name")
    public String myPageChangeName(HttpServletRequest request, @RequestParam String updateName) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return "redirect:/login";
        }

        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/login";
        }

        User user = userService.findById(userId);
        if (user == null) {
            return "redirect:/login";
        }

        userService.updateNameAndEmail(userId, updateName, user.getEmail());

        return "redirect:/mypage";
    }


    // 회원 탈퇴
    @PostMapping("/delete")
    public String deleteUser(HttpSession session) {
        // 세션에서 userId 꺼내기
        String userId = (String) session.getAttribute("userId");
        if (userId != null) {
            userService.delete(userId);
        }
        session.invalidate();
        return "redirect:/";
    }
}