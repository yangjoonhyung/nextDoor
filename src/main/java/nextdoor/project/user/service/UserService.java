package nextdoor.project.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

    public User findById(String userId) {
        return userRepository.findById(userId);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void changePassword(String userId, String newPassword) {
        userRepository.changePassword(userId, newPassword);
    }

    public void delete(String userId) {
        userRepository.delete(userId);
    }

    public User findByEmailAndName(String email, String name) {
        return userRepository.findByEmailAndName(email, name); // 이메일과 이름으로 회원 조회
    }

    @Transactional
    public void updateNameAndEmail(String userId, String name, String email){
        User user = userRepository.findById(userId);
        if (user == null){
            throw new IllegalArgumentException("사용자 " + userId + "을 찾을 수 없습니다.");
        }
        user.setName(name); // 이름 변경
        user.setEmail(email); // 이메일 변경
    }

    public boolean isSameId(String userId) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getUserId().equals(userId)) {
                return true;
            }
        }
        return false;
    }
}