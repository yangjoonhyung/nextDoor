package nextdoor.project.user.repository.jpa;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
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
        User result = em.createQuery(jpql, User.class)
                .setParameter("email", email)
                .setParameter("name", name)
                .getSingleResult();

        return result;

    }
}