package nextdoor.project.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class User {

    @Id
    private String userId;
    private String password;
    private String checkPassword; // 저장용이 아니라 확인용임
    private String name;
    private String email;
    private LocalDateTime joinDate; // 회원가입 날짜
    private UserState userState;
    private int numberOfReports; // 신고 횟수

    public User(String userId, String password, String name, String email) {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.email = email;
        this.joinDate = LocalDateTime.now();
        this.userState = UserState.ENABLE;
        this.numberOfReports = 0;
    }
}
