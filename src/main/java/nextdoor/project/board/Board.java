package nextdoor.project.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import nextdoor.project.plan.Plan;
import nextdoor.project.user.User;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User writer; // 작성자

    private String title;  // 제목: 강릉 3박4일 힐링여행(예시)

    @Column(length = 500)
    private String content; // 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private Plan plan; // db에 담겨있는 일정

    private LocalDateTime createdAt = LocalDateTime.now();
}
