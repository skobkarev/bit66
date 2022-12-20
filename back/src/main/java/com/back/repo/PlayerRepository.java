package com.back.repo;

import com.back.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Override
    Optional<Player> findById(Long id);
}
