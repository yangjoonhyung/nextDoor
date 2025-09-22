package nextdoor.project.tripplan.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@Service
public class TripPlanService {

    public LocalDate setStartDate(Integer startYear, Integer startMonth, Integer startDay) {
        LocalDate startDate = LocalDate.of(startYear, startMonth, startDay);
        return startDate;
    }

    public LocalDate setFinishDate(Integer finishYear, Integer finishMonth, Integer finishDay) {
        LocalDate finishDate = LocalDate.of(finishYear, finishMonth, finishDay);
        return finishDate;
    }
}
