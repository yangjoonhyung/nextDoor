package nextdoor.project.cart;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import nextdoor.project.user.User;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Cart {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //아이템 id
    @OneToOne
    private User user;
    private String placeId;     // api 받아오는 id
    private String placeName;   // 장소 이름
    private LocalDateTime addedAt = LocalDateTime.now();

}