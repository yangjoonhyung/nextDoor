package nextdoor.project.plan;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import nextdoor.project.user.User;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String planDetail; // 여행 정보

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt = LocalDateTime.now();
}