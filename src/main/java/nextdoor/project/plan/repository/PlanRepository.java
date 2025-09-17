package nextdoor.project.plan.repository;

import nextdoor.project.plan.Plan;
import nextdoor.project.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByUser(User user);
}