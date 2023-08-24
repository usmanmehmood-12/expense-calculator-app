import { Body, Controller, Post, Put, Delete, Param } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}

  @Post(':userId')
  async addExpense(@Param('userId') userId: string, @Body() expenseData: any) {
    console.log('addExpense');
    return await this.expenseService.addExpense(userId, expenseData);
  }

  @Put(':expenseId')
  async updateExpense(
    @Param('expenseId') expenseId: string,
    @Body() expenseData: any,
  ) {
    return await this.expenseService.updateExpense(expenseId, expenseData);
  }

  @Delete(':expenseId')
  async deleteExpense(@Param('expenseId') expenseId: string) {
    await this.expenseService.deleteExpense(expenseId);
    return { message: 'Expense deleted successfully' };
  }
}
