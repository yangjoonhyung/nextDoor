package nextdoor.project.user.repository.jpa;

import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;

import java.util.List;

public class JpaUserRepository implements UserRepository {

    @Override
    public User save(User user) {
        return null;
    }

    @Override
    public User findById(String userId) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return List.of();
    }

    @Override
    public void changePassword(String userId, String changePw) {

    }

    @Override
    public void delete(String userId) {

    }

    @Override
    public User findByEmailAndName(String email, String name) {
        return null;
    }
}
