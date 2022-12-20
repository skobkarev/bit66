package com.back.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.io.Serializable;
import java.sql.Date;


@Entity
@Table(name = "players")
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class Player implements Serializable {

    @Id
    @GeneratedValue(generator="players_seq_generator")
    @SequenceGenerator(name="players_seq_generator",sequenceName="players_id_seq", allocationSize=1)
    @Getter
    private Long id;

    @NotBlank(message = "firstName can not be empty")
    @Getter
    @Setter
    @NotNull(message = "firstName can not be null")
    private String firstName;
    @Getter
    @NotBlank(message = "lastName can not be empty")
    @Setter
    @NotNull(message = "lastName can not be null")
    private String lastName;

    @NotNull(message = "gender can not be null")
    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull(message = "birthDate can not be null")
    @Getter
    @Setter
    @Past(message = "birthDate can not be a future date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date birthDate;
    @NotBlank(message = "team can not be empty")
    @Getter
    @Setter
    @NotNull(message = "team can not be null")
    private String team;
    @NotNull(message = "country can not be null")
    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private Country country;

    public Player(String firstName, String lastName, Gender gender, Date birthDate, String team, Country country) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthDate = birthDate;
        this.team = team;
        this.country = country;
    }

}
