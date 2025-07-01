package org.digitalbanking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Digital Banking Backend is running!";
    }

    @GetMapping("/test")
    public String test() {
        return "Test endpoint works!";
    }
}