package nextdoor.project.user.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nextdoor.project.user.User;
import nextdoor.project.user.dto.UserIdFindDto;
import nextdoor.project.user.dto.UserDto;
import nextdoor.project.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // 회원 목록
    @GetMapping
    public ResponseEntity<Map<String, Object>> list(HttpSession session) {
        List<User> users = userService.findAll();
        Map<String, Object> response = new HashMap<>();
        response.put("users", users);
        response.put("currentUserId", session.getAttribute("userId"));
        return ResponseEntity.ok(response);
    }

    // 회원가입 + 검증 + 비밀번호 확인
    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> joinSubmit(
            @RequestBody UserDto userDto,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();

        // 입력값 검증
        if (userDto.getUserId() == null || userDto.getUserId().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "아이디를 입력해주세요.");
            return ResponseEntity.badRequest().body(response);
        }

        if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "비밀번호를 입력해주세요.");
            return ResponseEntity.badRequest().body(response);
        }

        if (userDto.getName() == null || userDto.getName().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "이름을 입력해주세요.");
            return ResponseEntity.badRequest().body(response);
        }

        if (userDto.getEmail() == null || userDto.getEmail().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "이메일을 입력해주세요.");
            return ResponseEntity.badRequest().body(response);
        }

        // 비밀번호와 확인 일치 여부 검사
        if (!userDto.getPassword().equals(userDto.getCheckPassword())) {
            response.put("success", false);
            response.put("message", "비밀번호가 일치하지 않습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 아이디 중복 검증
        if (userService.isSameId(userDto.getUserId())) {
            response.put("success", false);
            response.put("message", "이미 사용중인 아이디입니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 회원가입 수행
        User user = new User(
                userDto.getUserId(),
                userDto.getPassword(),
                userDto.getName(),
                userDto.getEmail()
        );
        userService.save(user);

        session.setAttribute("userId", user.getUserId());

        response.put("success", true);
        response.put("userId", user.getUserId());
        return ResponseEntity.ok(response);
    }

    // 로그인 API
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String, String> loginRequest,
            HttpSession session) {
        
        String userId = loginRequest.get("userId");
        String password = loginRequest.get("password");
        
        Map<String, Object> response = new HashMap<>();
        
        if (userId == null || password == null) {
            response.put("success", false);
            response.put("message", "아이디와 비밀번호를 입력해주세요.");
            return ResponseEntity.badRequest().body(response);
        }
        
        User user = userService.findById(userId);
        if (user == null || !user.getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
            return ResponseEntity.badRequest().body(response);
        }
        
        session.setAttribute("userId", userId);
        response.put("success", true);
        response.put("userId", userId);
        return ResponseEntity.ok(response);
    }

    // 아이디 중복 AJAX
    @GetMapping("/check-duplicate-id")
    public ResponseEntity<Map<String, String>> checkSameId(@RequestParam String userId) {
        Map<String, String> response = new HashMap<>();
        if (userService.isSameId(userId)) {
            response.put("errorMessage", "이미 사용중인 아이디입니다.");
        } else {
            response.put("successMessage", "사용 가능한 아이디입니다.");
        }
        return ResponseEntity.ok(response);
    }

    // 회원 조회
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> detail(@PathVariable String userId) {
        User user = userService.findById(userId);
        Map<String, Object> response = new HashMap<>();
        if (user == null) {
            response.put("success", false);
            response.put("message", "사용자를 찾을 수 없습니다.");
            return ResponseEntity.notFound().build();
        }
        response.put("success", true);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    // 이메일 찾기
    @GetMapping("/find")
    public ResponseEntity<Map<String, Object>> findByEmailAndName(@RequestParam String email, @RequestParam String name) {
        User user = userService.findByEmailAndName(email, name);
        Map<String, Object> response = new HashMap<>();
        if (user == null) {
            response.put("success", false);
            response.put("message", "일치하는 회원이 없습니다.");
            return ResponseEntity.notFound().build();
        }
        response.put("success", true);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    // 아이디 찾기
    @PostMapping("/findId")
    public ResponseEntity<Map<String, Object>> findId(@Valid @RequestBody UserIdFindDto userIdFindDto, BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();
        
        if (bindingResult.hasErrors()) {
            response.put("success", false);
            response.put("message", "입력 정보를 확인해주세요.");
            return ResponseEntity.badRequest().body(response);
        }

        User result = userService.findByEmailAndName(userIdFindDto.getEmail(), userIdFindDto.getName());

        if (result == null) {
            response.put("success", false);
            response.put("message", "일치하는 회원이 없습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("success", true);
        response.put("userId", result.getUserId());
        return ResponseEntity.ok(response);
    }

    //비밀번호 변경 처리
    @PostMapping("/{userId}/password")
    public ResponseEntity<Map<String, Object>> changePassword(@PathVariable String userId,
                                 @RequestBody Map<String, String> passwordRequest) {
        
        String newPassword = passwordRequest.get("newPassword");
        String checkPassword = passwordRequest.get("checkPassword");
        
        Map<String, Object> response = new HashMap<>();

        if (!newPassword.equals(checkPassword)) {
            response.put("success", false);
            response.put("message", "비밀번호가 일치하지 않습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            userService.changePassword(userId, newPassword);
            response.put("success", true);
            response.put("message", "비밀번호가 변경되었습니다.");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // 회원 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable String userId) {
        Map<String, Object> response = new HashMap<>();
        userService.delete(userId);
        response.put("success", true);
        response.put("message", "회원이 삭제되었습니다.");
        return ResponseEntity.ok(response);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "로그아웃되었습니다.");
        return ResponseEntity.ok(response);
    }
}