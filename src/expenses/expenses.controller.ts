import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { Expense } from './expenses.entity';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}

  @Get(':userId')
  async getExpenses(@Param('userId') userId: string): Promise<Expense[]> {
    return this.expenseService.getExpenses(userId);
  }

  @Post(':userId')
  async addExpense(@Param('userId') userId: string, @Body() expenseData: any) {
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
