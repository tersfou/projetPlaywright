/**
 * Test Data Helper class to generate and manage test data
 */
export class TestDataHelper {
  /**
   * Generate a random email
   * @returns Random email
   */
  static generateRandomEmail(): string {
    const timestamp = new Date().getTime();
    return `test_${timestamp}@example.com`;
  }

  /**
   * Generate a random name
   * @returns Random name
   */
  static generateRandomName(): string {
    const names = [
      'John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 
      'Edward', 'Fiona', 'George', 'Hannah'
    ];
    const surnames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 
      'Miller', 'Davis', 'Garcia', 'Wilson', 'Taylor'
    ];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    
    return `${randomName} ${randomSurname}`;
  }

  /**
   * Generate a random password
   * @param length Password length
   * @returns Random password
   */
  static generateRandomPassword(length: number = 10): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }

  /**
   * Generate random user data
   * @returns Random user data
   */
  static generateRandomUserData(): any {
    return {
      name: this.generateRandomName(),
      email: this.generateRandomEmail(),
      password: this.generateRandomPassword(),
      title: Math.random() > 0.5 ? 'Mr.' : 'Mrs.',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'Test Company',
      address1: '123 Test Street',
      address2: 'Apt 456',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobile_number: '1234567890'
    };
  }

  /**
   * Get test user data (predefined)
   * @returns Predefined test user data
   */
  static getTestUserData(): any {
    return {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'Password123!',
      title: 'Mr.',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'Test Company',
      address1: '123 Test Street',
      address2: 'Apt 456',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobile_number: '1234567890'
    };
  }

  /**
   * Get test product data (predefined)
   * @returns Predefined test product data
   */
  static getTestProductData(): any {
    return {
      name: 'Blue Top',
      price: 'Rs. 500',
      category: 'Women > Tops',
      brand: 'Polo'
    };
  }
}
