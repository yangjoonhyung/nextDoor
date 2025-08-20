package nextdoor.project.user.service;

import lombok.RequiredArgsConstructor;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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
}