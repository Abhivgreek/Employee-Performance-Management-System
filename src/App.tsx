import React, { useState } from 'react';
import { ChartBar, UserPlus, UserMinus } from 'lucide-react';
import { LineChart, XAxis, YAxis, Line, Tooltip } from 'recharts';

interface Employee {
  name: string;
  performance: number;
}

interface Stats {
  averagePerformance: number;
  highestPerformance: number;
  lowestPerformance: number;
}

const EmployeePerformanceManagementSystem = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { name: 'John Doe', performance: 80 },
    { name: 'Jane Doe', performance: 70 },
    { name: 'Bob Smith', performance: 90 },
  ]);

  const [stats, setStats] = useState<Stats>({
    averagePerformance: 0,
    highestPerformance: 0,
    lowestPerformance: 0,
  });

  const addEmployee = (name: string, performance: number) => {
    setEmployees([...employees, { name, performance }]);
    updateStats();
  };

  const removeEmployee = (name: string) => {
    setEmployees(employees.filter((employee) => employee.name !== name));
    updateStats();
  };

  const updateStats = () => {
    const totalPerformance = employees.reduce((acc, curr) => acc + curr.performance, 0);
    const averagePerformance = totalPerformance / employees.length;
    const highestPerformance = Math.max(...employees.map((employee) => employee.performance));
    const lowestPerformance = Math.min(...employees.map((employee) => employee.performance));

    setStats({ averagePerformance, highestPerformance, lowestPerformance });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Employee Performance Management System</h1>

      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-2">Add Employee</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = (e.target as any).name.value;
              const performance = parseInt((e.target as any).performance.value);
              addEmployee(name, performance);
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="block w-full p-2 mb-2 border border-gray-400 rounded"
            />
            <input
              type="number"
              name="performance"
              placeholder="Performance (1-100)"
              className="block w-full p-2 mb-2 border border-gray-400 rounded"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <UserPlus size={18} className="mr-2" />
              Add Employee
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-2">Employee List</h2>
          <ul>
            {employees.map((employee) => (
              <li key={employee.name} className="flex justify-between mb-2">
                <span>{employee.name}</span>
                <span>Performance: {employee.performance}</span>
                <button
                  onClick={() => removeEmployee(employee.name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <UserMinus size={18} className="mr-2" />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-2">Stats</h2>
          <ul>
            <li className="mb-2">
              <span>Average Performance:</span>
              <span>{stats.averagePerformance.toFixed(2)}</span>
            </li>
            <li className="mb-2">
              <span>Highest Performance:</span>
              <span>{stats.highestPerformance}</span>
            </li>
            <li className="mb-2">
              <span>Lowest Performance:</span>
              <span>{stats.lowestPerformance}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-2">Performance Chart</h2>
        <LineChart width={500} height={300} data={employees}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="performance" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default EmployeePerformanceManagementSystem;