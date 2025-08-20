package nextdoor.project.user.controller;

import lombok.RequiredArgsConstructor;
import nextdoor.project.user.User;
import nextdoor.project.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원 전체 조회
    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    // 회원 단건 조회
    @GetMapping("/{userId}")
    public User getById(@PathVariable String userId) {
        return userService.findById(userId);
    }

    // 회원가입
    @PostMapping
    public User join(@RequestBody User user) {
        return userService.save(user);
    }

    // 비밀번호 변경
    @PatchMapping("/{userId}/password")
    public void changePassword(
            @PathVariable String userId,
            @RequestParam String newPassword
    ) {
        userService.changePassword(userId, newPassword);
    }

    // 회원 탈퇴
    @DeleteMapping("/{userId}")
    public void delete(@PathVariable String userId) {
        userService.delete(userId);
    }
}