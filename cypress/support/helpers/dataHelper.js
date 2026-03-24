class DataHelper {
  static generateFirstName() {
    const names = [
      'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 
      'Brian', 'Mary', 'Linda', 'James', 'Patricia', 'Jennifer', 'William', 
      'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Karen',
      'Christopher', 'Nancy', 'Daniel', 'Betty', 'Paul', 'Helen', 'Mark', 'Sandra',
      'Donald', 'Donna', 'George', 'Carol', 'Kenneth', 'Ruth', 'Steven', 'Sharon',
      'Edward', 'Michelle', 'Kevin', 'Laura', 'Jason', 'Kimberly', 'Andrew', 'Deborah'
    ];
    return names[Math.floor(Math.random() * names.length)];
}

static generateLastName() {
    const names = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 
      'Lopes', 'Taylor', 'Adams', 'Lee', 'Rodriguez', 'Martinez', 'Hernandez', 
      'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 
      'Jackson', 'Martin', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 
      'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright',
      'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Nelson', 'Baker'
    ];
    return names[Math.floor(Math.random() * names.length)];
}

  static generateEmail() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `test${timestamp}${random}@example.com`;
  }

  static generateMobile() {
    return `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  }

  static generateAge(min = 18, max = 80) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateSalary() {
    return Math.floor(Math.random() * (100000 - 30000 + 1)) + 30000;
  }

  static generateDepartment() {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
    return departments[Math.floor(Math.random() * departments.length)];
  }

  static generateAddress() {
    const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine Rd'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const number = Math.floor(Math.random() * 9999) + 1;
    return `${number} ${street}`;
  }

  static generateSubject() {
    const subjects = ['Maths', 'Physics', 'Chemistry', 'English', 'Computer Science'];
    return subjects[Math.floor(Math.random() * subjects.length)];
  }

  static generateFormData() {
    return {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      email: this.generateEmail(),
      mobile: this.generateMobile(),
      subject: this.generateSubject(),
      address: this.generateAddress()
    };
  }

  static generateRecordData() {
    return {
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      email: this.generateEmail(),
      age: this.generateAge(),
      salary: this.generateSalary(),
      department: this.generateDepartment()
    };
  }
}

export default DataHelper;
