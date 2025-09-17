package nextdoor.project.board.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import nextdoor.project.board.Board;
import nextdoor.project.board.repository.BoardRepository;
import nextdoor.project.plan.Plan;
import nextdoor.project.plan.repository.PlanRepository;
import nextdoor.project.user.User;
import nextdoor.project.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardRepository boardRepository;
    private final PlanRepository planRepository;
    private final UserService userService;

    // 게시판 메인 - 내가 쓴 게시글 목록
    @GetMapping
    public String boardList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session == null) return "redirect:/login";
        String userId = (String) session.getAttribute("userId");
        if (userId == null) return "redirect:/login";

        User user = userService.findById(userId);
        List<Board> boards = boardRepository.findByWriter(user);

        model.addAttribute("boards", boards);
        return "board/list";
    }

    // 게시글 작성 폼 - 여행계획 선택 포함
    @GetMapping("/write")
    public String writeForm(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session == null) return "redirect:/login";
        String userId = (String) session.getAttribute("userId");
        if (userId == null) return "redirect:/login";

        User user = userService.findById(userId);
        List<Plan> plans = planRepository.findByUser(user); // DB에서 꺼내온 내 일정

        model.addAttribute("plans", plans);
        return "board/writeForm";
    }

    // 게시글 저장 - Plan db 연동해서 저장
    @PostMapping("/write")
    public String writeBoard(HttpServletRequest request, @RequestParam String title, @RequestParam String content,
                             @RequestParam Long planId) {
        HttpSession session = request.getSession(false);
        if (session == null) return "redirect:/login";
        String userId = (String) session.getAttribute("userId");
        if (userId == null) return "redirect:/login";

        User user = userService.findById(userId);
        Plan plan = planRepository.findById(planId).orElse(null);
        if (plan == null) {
            // 예외처리 - 유효하지 않은 일정 선택
            return "redirect:/board/write?error=InvalidPlan";
        }

        Board board = new Board();
        board.setTitle(title);
        board.setContent(content);
        board.setWriter(user);
        board.setPlan(plan);
        boardRepository.save(board);

        return "redirect:/board";
    }

    // 게시글 삭제
    @PostMapping("/delete/{boardId}")
    public String deleteBoard(@PathVariable Long boardId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return "redirect:/login";
        String userId = (String) session.getAttribute("userId");
        if (userId == null) return "redirect:/login";

        Board board = boardRepository.findById(boardId).orElse(null);
        if (board != null && board.getWriter().getUserId().equals(userId)) {
            boardRepository.delete(board);
        }

        return "redirect:/board";
    }
}