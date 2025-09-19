package nextdoor.project.aimodel;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class AiResponse {
    private List<ByDay> byDay;
    private Map<String, List<Long>> droppedByDay;
    private double legsCost;
    private double legsDistanceKm;
    private String note;

    @Data
    public static class ByDay {
        private String weekday;
        private List<Long> visitIds;
        private List<String> visitNames;
        private List<String> arrivals;
        private List<Long> droppedIds;
    }
}
