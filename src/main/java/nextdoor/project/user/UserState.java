package nextdoor.project.user;

public enum UserState {

    ENABLE("정상"), BANNED("정지");

    private final String codeName;


    UserState(String codeName) {
        this.codeName = codeName;
    }
}
