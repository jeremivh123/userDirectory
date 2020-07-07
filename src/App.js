import React from 'react';

class App extends React.Component {
  state = {
    isLoading: true,
    employees: [],
    allEmployees: []
  }

  componentDidMount() {
    fetch('/employees.json')
      .then(response => response.json())
      .then(employees => {
        this.setState({
          employees: employees,
          isLoading: false,
          allEmployees: employees
        })
      });
  }

  filterEmployees = event => {
    const selectedRole = event.target.value;
    console.log(selectedRole)

    if (selectedRole === 'all') {
      this.setState({ employees: this.state.allEmployees });
    } else {

      // set this equal to a varable
      var filterEmployees = this.state.allEmployees.filter(employee => {
        if (employee.role === selectedRole) {
          return true
        }
        return false;
      });
      this.setState({ employees: filterEmployees });

      /* 
      create a new employee array that filters to only employees that have the selected role
  
      use the filter function
      */

      // update it here
      // set  the new employees as the updated state
      // this.setState({ employees: /* new employees array goes here after filtered }) */
    }
  }

  sortEmployees = (event) => {
    let employees = this.state.employees;
    const sortSelection = event.target.value;
    if (sortSelection === 'alpOrder') {
      // sorting the employees state


       employees = employees.sort((employee1, employee2) => {
        if (employee1.name < employee2.name) {
          return -1;
        }

        if (employee2.name > employee1.name) {
          return 1
        }

        return 0;
      })

      this.setState({ employees });
    } else{

       employees = employees.sort((employee1, employee2) => {
        if (employee1.name < employee2.name) {
          return 1;
        }

        if (employee1.name > employee2.name) {
          return -1
        }

        return 0;
      })

      this.setState({ employees });

    }




    // doing the opposite sort here


  }




render(){
  const { isLoading, employees } = this.state;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <label>filter by role</label>
        <select onChange={this.filterEmployees}>
          <option value="all">All</option>
          <option value="manager">Manager</option>
          <option value="engineer">Engineer</option>
          <option value="intern">Intern</option>
          {/* List all roles as options here */}
        </select>
      </div>
      <div>
        <label>sort by...</label>
        <select onChange={this.sortEmployees}>
          <option value="alpOrder"> A-Z</option>
          <option value="reverse">Z-A</option>

          {/* List all roles as options here */}
        </select>
      </div>
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Phone #</th>
        </tr>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.role}</td>
            <td>{employee.phone}</td>
          </tr>
        ))}
      </table>
    </>
  )
}};




export default App;
