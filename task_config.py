class TaskConfig:
    def __init__(self):
        self.tasks = []

    def add_task(self, title, description, frequency):
        self.tasks.append({
            "title": title,
            "description": description,
            "frequency": frequency
        })

    def get_tasks(self):
        return self.tasks

# Example Usage
task_config = TaskConfig()
task_config.add_task("Send Report", "Send the monthly report to the manager", "Monthly")
print(task_config.get_tasks())