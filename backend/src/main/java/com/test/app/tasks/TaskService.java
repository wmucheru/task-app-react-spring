package com.test.app.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repository;

    @Autowired
    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public Task getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task create(Task task) {
        return repository.save(task);
    }

    public Task update(Long id, Task taskData) {
        Task task = getById(id);
        task.setTitle(taskData.getTitle());
        task.setDescription(taskData.getDescription());
        task.setStatus(taskData.getStatus());
        task.setPriority(taskData.getPriority());
        task.setAssigneeId(taskData.getAssigneeId());
        task.setCreatorId(taskData.getCreatorId());
        return repository.save(task);
    }

    public Long delete(Long id) {
        repository.deleteById(id);
        return id;
    }

}
