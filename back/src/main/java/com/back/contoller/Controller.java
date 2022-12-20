package com.back.contoller;

import com.back.model.Player;
import com.back.repo.PlayerRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/players")
@Slf4j
@CrossOrigin("http://localhost:4200")
public class Controller {
    @Autowired
    private PlayerRepository playerRepository;

    @PostMapping
    public Player savePlayer(@Validated @RequestBody Player player) {
        log.info("incoming player to save {}", player);
        Player insertedPlayer =  playerRepository.save(player);
        log.info("save player {}", insertedPlayer);
        return insertedPlayer;
    }

    @PutMapping
    public Player updatePlayer(@Validated @RequestBody Player player) throws Exception {
        log.info("incoming player to update {}", player);
        Optional<Player> retrieveResult = playerRepository.findById(player.getId());
        if (retrieveResult.isPresent()) {
            log.info("updatePlayer with id {}: previous fields [{}], change with actual fields [{}]",
                    player.getId(),
                    retrieveResult.get(),
                    player);
            Player tempPlayer = retrieveResult.get();
            tempPlayer.setFirstName(player.getFirstName());
            tempPlayer.setLastName(player.getLastName());
            tempPlayer.setCountry(player.getCountry());
            tempPlayer.setBirthDate(player.getBirthDate());
            tempPlayer.setGender(player.getGender());
            tempPlayer.setTeam(player.getTeam());
            return playerRepository.save(tempPlayer);
        }
         else {
             throw new Exception("no player with such id " + player.getId());
        }
    }

    @GetMapping
    public List<Player> findAllPlayers() {
        List<Player> players = playerRepository.findAll();
        log.info("retrieved players {}", players);
        return players;
    }

    @GetMapping("/{id}")
    public Player findById(@PathVariable long id) {
        log.info("try to fetch player with id {}", id);
        Player player = playerRepository.findById(id).orElseThrow();
        log.info("player [{}] was successfully fetched", player);
        return player;
    }

}
