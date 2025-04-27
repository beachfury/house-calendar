import WidgetWrapper from '../../core/WidgetWrapper';

export default function TasksWidget() {
  const tasks = ['Buy groceries', 'Clean garage', 'Update report'];

  return (
    <WidgetWrapper title="Tasks">
      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200">
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
    </WidgetWrapper>
  );
}
