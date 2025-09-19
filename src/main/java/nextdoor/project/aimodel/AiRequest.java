package nextdoor.project.aimodel;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AiRequest {

    private List<Long> content_ids;
    private List<DaySchedule> days;
    private double alpha;
    private double beta;
    private double gamma;
    private int min_visits_per_day;

    @Getter @Setter
    public static class DaySchedule {
        private String weekday;
        private int open_hour;
        private int close_hour;

        public DaySchedule(String weekday) {
            this.weekday = weekday;
            this.open_hour = 10;
            this.close_hour = 10;
        }
    }

    public AiRequest(List<Long> content_ids, List<DaySchedule> days) {
        this.content_ids = content_ids;
        this.days = days;
        this.alpha = 1.0;
        this.beta = 0.5;
        this.gamma = 10000.0;
        this.min_visits_per_day = 2;
    }
}
