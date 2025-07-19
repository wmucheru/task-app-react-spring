package com.test.app.data;

import com.test.app.tasks.Task;
import com.test.app.tasks.TaskRepository;
import com.test.app.users.User;
import com.test.app.users.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class InitDatabase {

    private static final Logger log = LoggerFactory.getLogger(InitDatabase.class);

    @Bean
    CommandLineRunner seedTaskData(TaskRepository repository) {
        return args -> {
            List<Task> tasks = new ArrayList<>();
            tasks.add(new Task("Add UI", "", 2, 1));
            tasks.add(new Task("Review test code", "", 3, 1));
            tasks.add(new Task("Meet client", "", 4, 1));
            tasks.add(new Task("Compile status reports", "", 1, 1));

            for(Task task : tasks){
                log.info("Seeding task: " + repository.save(task));
            }
        };
    }

    @Bean
    CommandLineRunner seedUserData(UserRepository repository) {
        return args -> {
            String password = "12345";

            List<User> users = new ArrayList<>();
            users.add(new User("admin", "admin@example.com", password, User.ROLE_ADMIN));
            users.add(new User("user1", "user1@example.com", password, User.ROLE_USER));
            users.add(new User("user2", "user2@example.com", password, User.ROLE_USER));
            users.add(new User("user3", "user3@example.com", password, User.ROLE_USER));
;
            for(User user : users){
                log.info("Seeding user: " + repository.save(user));
            }
        };
    }
}
