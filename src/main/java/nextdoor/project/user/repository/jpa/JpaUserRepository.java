package nextdoor.project.user.repository.jpa;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import nextdoor.project.user.User;
import nextdoor.project.user.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JpaUserRepository implements UserRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public User save(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public User findById(String userId) {
        return em.find(User.class, userId);
    }

    @Override
    public List<User> findAll() {
        return em.createQuery("select u from User u", User.class).getResultList();
    }

    @Override
    public void changePassword(String userId, String changePw) {
        User user = em.find(User.class, userId);
        if (user != null) {
            user.setPassword(changePw);
        }
    }

    @Override
    public void delete(String userId) {
        User user = em.find(User.class, userId);
        if (user != null) {
            em.remove(user);
        }
    }

    @Override
    public User findByEmailAndName(String email, String name) {
        List<User> list = em.createQuery("select u from User u where u.email = :email and u.name = :name", User.class)
                .setParameter("email", email)
                .setParameter("name", name)
                .getResultList();
        return list.isEmpty() ? null : list.get(0);
    }
}