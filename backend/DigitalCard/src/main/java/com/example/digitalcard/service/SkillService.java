package com.example.digitalcard.service;

import com.example.digitalcard.dto.SkillDto;

import java.util.List;

public interface SkillService {
    SkillDto addSkill(SkillDto skillDto);
    SkillDto updateSkill(SkillDto skillDto);
    void deleteSkill(Long id);
    List<SkillDto> getSkillsByUserId(Long userId);
    void saveSkillList(List<SkillDto> skillList);
}
