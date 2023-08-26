import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Expense } from './expenses.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: MongoRepository<Expense>,
  ) {}

  async getExpenses(userId: string): Promise<Expense[]> {
    const expenses = await this.expenseRepository.find({ userId });
    return expenses;
  }
  async addExpense(userId: string, expenseData: any): Promise<Expense> {
    const expense = new Expense({
      userId,
      ...expenseData,
    });

    return await this.expenseRepository.save(expense);
  }

  async updateExpense(
    expenseId: string,
    expenseData: any,
  ): Promise<Expense | undefined> {
    try {
      const expense = await this.expenseRepository.findOne({
        where: { _id: new ObjectId(expenseId) },
      });

      this.expenseRepository.merge(expense, expenseData);

      return await this.expenseRepository.save(expense);
    } catch (error) {
      throw new NotFoundException('Expense not found');
    }
  }

  async deleteExpense(expenseId: string): Promise<void> {
    const result = await this.expenseRepository.delete(new ObjectId(expenseId));

    if (result.affected === 0) {
      throw new NotFoundException('Expense not found');
    }
  }
}
