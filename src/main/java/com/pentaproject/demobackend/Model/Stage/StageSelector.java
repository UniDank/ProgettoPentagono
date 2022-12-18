package com.pentaproject.demobackend.Model.Stage;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StageSelector {
    private List<Stage> stages;

    @Override
    public String toString() {
        return "StageSelector{" +
                "stages=" + stages +
                '}';
    }
}
