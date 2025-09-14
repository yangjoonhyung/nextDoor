package nextdoor.project.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Area {

    @JsonProperty("addr1")
    private String addr1;
    @JsonProperty("addr2")
    private String addr2;
    @JsonProperty("areacode")
    private String areacode;
    @JsonProperty("contentid")
    private String contentid;
    @JsonProperty("contenttypeid")
    private String contenttypeid;
    @JsonProperty("firstimage")
    private String firstimage;
    @JsonProperty("firstimage2")
    private String firstimage2;
    @JsonProperty("mapx")
    private String mapx;
    @JsonProperty("mapy")
    private String mapy;
    @JsonProperty("tel")
    private String tel;
    @JsonProperty("title")
    private String title;

}

