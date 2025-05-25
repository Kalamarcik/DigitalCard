package com.example.digitalcard.controller;

import com.example.digitalcard.dto.SkillDto;
import com.example.digitalcard.entity.Skill;
import com.example.digitalcard.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://192.168.1.69:4200")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<SkillDto> addSkill(@RequestBody SkillDto skillDto) {
        return ResponseEntity.ok(skillService.addSkill(skillDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillDto> updateSkill(@PathVariable Long id, @RequestBody SkillDto skillDto) {
        skillDto.setId(id);
        return ResponseEntity.ok(skillService.updateSkill(skillDto));
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
    }

    @GetMapping("/user/{userId}")
    public List<SkillDto> getSkillsByUserId(@PathVariable Long userId) {
        return skillService.getSkillsByUserId(userId);
    }

    @PostMapping("/bulk")
    public ResponseEntity<?> saveSkillsBulk(@RequestBody List<SkillDto> skillList) {
        skillService.saveSkillList(skillList);
        return ResponseEntity.ok().build();
    }
}
