const Header = props => <h1>{props.course}</h1>;

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = props => (
  <>
    {props.parts.map(part => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
