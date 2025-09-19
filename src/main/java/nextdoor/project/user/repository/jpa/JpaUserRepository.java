package nextdoor.project.user.repository.jpa;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class JpaUserRepository implements UserRepository {

    private final EntityManager em;

    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public User findById(String userId) {
        User user = em.find(User.class, userId);
        return user;
    }

    @Override
    public List<User> findAll() {
        String jpql = "select u from User u";
        List resultList = em.createQuery(jpql).getResultList();
        return resultList;
    }

    @Override
    public void changePassword(String userId, String changePw) {
        User user = em.find(User.class, userId);
        if (user == null) {
            throw new IllegalArgumentException("사용자 " + userId + "을 찾을 수 없습니다.");
        }
        user.setPassword(changePw);
    }

    @Override
    public void delete(String userId) {
        User user = em.find(User.class, userId);
        em.remove(user);
    }

    @Override
    public User findByEmailAndName(String email, String name) {
        String jpql = "select u from User u where u.email = :email and u.name = :name";
        List<User> results = em.createQuery(jpql, User.class)
                .setParameter("email", email)
                .setParameter("name", name)
                .getResultList();

        return results.isEmpty() ? null : results.get(0);
    }
}