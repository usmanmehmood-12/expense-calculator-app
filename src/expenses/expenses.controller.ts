import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Expense } from './expenses.entity';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getExpenses(@Req() request: Request): Promise<Expense[]> {
    // @ts-ignore
    return this.expenseService.getExpenses(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addExpense(@Req() request: Request, @Body() expenseData: any) {
    // @ts-ignore
    return await this.expenseService.addExpense(request.user.id, expenseData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':expenseId')
  async updateExpense(
    @Param('expenseId') expenseId: string,
    @Body() expenseData: any,
  ) {
    return await this.expenseService.updateExpense(expenseId, expenseData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':expenseId')
  async deleteExpense(@Param('expenseId') expenseId: string) {
    await this.expenseService.deleteExpense(expenseId);
    return { message: 'Expense deleted successfully' };
  }
}
