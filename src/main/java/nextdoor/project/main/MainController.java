package nextdoor.project.main;

import org.springframework.web.bind.annotation.GetMapping;

public class MainController {

    @GetMapping("/")
    public String main() {
        return "travel";
    }

    @GetMapping("/travel")
    public String travel() {
        return "travel";
    }


}
