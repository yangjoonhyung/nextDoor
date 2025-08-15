package nextdoor.project.user.repository;

import nextdoor.project.user.User;

import java.util.List;

public interface UserRepository {

    User save(User user);

    User findById(String userId);

    List<User> findAll();

    void changePassword(String userId, String changePw);

    void delete(String userId);


}
