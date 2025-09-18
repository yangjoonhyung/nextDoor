package nextdoor.project.tripplan;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import nextdoor.project.user.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class TripPlan {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tripPlanID;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    private LocalDate startDate;
    private LocalDate finishDate;

    public TripPlan() {
    }

    public TripPlan(User user, int startYear, int startMonth, int startDay, int finishYear, int finishMonth, int finishDay) {
        this.user = user;
        this.startDate = LocalDate.of(startYear, startMonth, startDay);
        this.finishDate = LocalDate.of(finishYear, finishMonth, finishDay);
    }
}
