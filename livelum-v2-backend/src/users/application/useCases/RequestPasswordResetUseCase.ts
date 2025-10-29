import type { UserRepository } from '../../domain/contracts/UserRepository';
import type { PasswordHashService } from '../../domain/services/PasswordHashService';
import { Logger } from '@/cross-cutting/infrastructure/logger/Logger';

export class RequestPasswordResetUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly logger: Logger,
  ) {}

  async execute(email: string): Promise<{ message: string; token?: string }> {
    this.logger.info('Solicitud de reseteo de contraseña', { email });

    // Buscar el usuario por email
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      this.logger.warn('Email no encontrado para reset', { email });
      return {
        message: 'Si el email existe, recibirás instrucciones para resetear tu contraseña',
      };
    }

    try {
      // Generar token de reseteo
      const resetToken = this.passwordHashService.generateToken();
      
      // Guardar el token en el usuario (expira en 24 horas)
      user.generateResetPasswordToken(resetToken, 24);

      // Guardar cambios
      await this.userRepository.save(user);

      this.logger.info('Token de reseteo generado', { 
        userId: user.id,
        username: user.username 
      });

      // TODO: Enviar email con el token
      // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

      return {
        message: 'Si el email existe, recibirás instrucciones para resetear tu contraseña',
        token: resetToken, // En producción, esto solo se envía por email
      };
    } catch (error) {
      this.logger.error('Error al generar token de reseteo', { 
        error: (error as Error).message,
        email 
      });
      throw error;
    }
  }
}

