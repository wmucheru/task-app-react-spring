package com.test.app.tasks;

import com.test.app.utils.TimeUtils;
import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    // Statuses
    public static int STATUS_TODO = 1;
    public static int STATUS_IN_PROGRESS = 2;
    public static int STATUS_DONE = 3;

    // Priority
    public static int PRIORITY_HIGH = 1;
    public static int PRIORITY_MEDIUM = 2;
    public static int PRIORITY_LOW = 3;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private int status;
    private int priority;
    private int assigneeId;
    private int creatorId;
    private String createdAt;
    private String updatedAt;

    public Task() {}

    public Task(String title, String description, int assigneeId, int creatorId) {
        this.title = title;
        this.description = description;
        this.assigneeId = assigneeId;
        this.creatorId = creatorId;
    }

    @PrePersist
    public void onCreate() {
        status = STATUS_TODO;
        priority = PRIORITY_MEDIUM;
        createdAt = TimeUtils.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = TimeUtils.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public int getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(int assigneeId) {
        this.assigneeId = assigneeId;
    }

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
