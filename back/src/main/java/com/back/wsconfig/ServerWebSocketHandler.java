package com.back.wsconfig;

import com.back.repo.PlayerRepository;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.SubProtocolCapable;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.HtmlUtils;

import java.io.IOException;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Slf4j
public class ServerWebSocketHandler extends TextWebSocketHandler implements SubProtocolCapable {

    @Autowired
    private PlayerRepository playerRepository;
    private final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Server connection opened session is {}", session.getId());
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.info("Server connection closed: {}", status);
        sessions.remove(session);
    }

    /*
    Deprecated method - just to maintain permanent connection. After implementing reconnect in Angular
    client is no more necessary

    @Scheduled(fixedRate = 3000)
    void sendPeriodicMessages() throws IOException {
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                String broadcast = "server periodic message " + LocalTime.now();
                log.info("Server sends: {}", broadcast);
                session.sendMessage(new TextMessage(broadcast));
            }
        }
    }*/

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        String request = message.getPayload();
        log.info("Server received: {} session is {}", request, session.getId());
        String response = String.format("response from server to '%s'", HtmlUtils.htmlEscape(request));
        log.info("Server sends: {}", response);

        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd")
                .create();

        log.info("all players {}", playerRepository.findAll().size());
        String playersAsJsonString = gson.toJson(playerRepository.findAll());

        sessions.stream().forEach(s -> {
            try {
                s.sendMessage(new TextMessage(playersAsJsonString));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        log.info("Server transport error: {}", exception.getMessage());
    }

    @Override
    public List<String> getSubProtocols() {
        return Collections.singletonList("subprotocol.demo.websocket");
    }


}
