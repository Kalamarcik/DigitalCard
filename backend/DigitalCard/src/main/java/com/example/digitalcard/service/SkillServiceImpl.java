package com.example.digitalcard.service;

import com.example.digitalcard.dto.SkillDto;
import com.example.digitalcard.entity.Skill;
import com.example.digitalcard.entity.User;
import com.example.digitalcard.repository.SkillRepository;
import com.example.digitalcard.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillServiceImpl(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    @Override
    public SkillDto addSkill(SkillDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();
        Skill skill = new Skill(dto.getName(), dto.getLevel(), user);
        return toDto(skillRepository.save(skill));
    }

    @Override
    public SkillDto updateSkill(SkillDto dto) {
        Skill skill = skillRepository.findById(dto.getId()).orElseThrow();
        skill.setName(dto.getName());
        skill.setLevel(dto.getLevel());
        return toDto(skillRepository.save(skill));
    }

    @Override
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }

    @Override
    public List<SkillDto> getSkillsByUserId(Long userId) {
        return skillRepository.findByUserId(userId).stream().map(this::toDto).toList();
    }

    @Override
    public void saveSkillList(List<SkillDto> skillList) {
        for (SkillDto dto : skillList) {
            User user = userRepository.findById(dto.getUserId()).orElseThrow();
            Skill skill = new Skill(dto.getName(), dto.getLevel(), user);
            skillRepository.save(skill);
        }
    }

    private SkillDto toDto(Skill skill) {
        SkillDto dto = new SkillDto();
        dto.setId(skill.getId());
        dto.setName(skill.getName());
        dto.setLevel(skill.getLevel());
        dto.setUserId(skill.getUser().getId());
        return dto;
    }
}

