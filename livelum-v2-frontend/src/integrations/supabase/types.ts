export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_program: {
        Row: {
          actual_date: string | null
          audit_type: string
          auditor_name: string
          created_at: string
          findings: string | null
          id: string
          planned_date: string
          recommendations: string | null
          scope: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          actual_date?: string | null
          audit_type: string
          auditor_name: string
          created_at?: string
          findings?: string | null
          id?: string
          planned_date: string
          recommendations?: string | null
          scope?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          actual_date?: string | null
          audit_type?: string
          auditor_name?: string
          created_at?: string
          findings?: string | null
          id?: string
          planned_date?: string
          recommendations?: string | null
          scope?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      context_links: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          link_description: string | null
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          link_description?: string | null
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          link_description?: string | null
          source_id?: string
          source_type?: string
          target_id?: string
          target_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          calibration_frequency_days: number | null
          category: string
          code: string
          created_at: string
          description: string | null
          id: string
          last_calibration_date: string | null
          last_maintenance_date: string | null
          location: string | null
          maintenance_frequency_days: number | null
          name: string
          next_calibration_date: string | null
          next_maintenance_date: string | null
          purchase_date: string | null
          responsible_user_id: string | null
          status: string
          updated_at: string
          warranty_expiration: string | null
        }
        Insert: {
          calibration_frequency_days?: number | null
          category: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          last_calibration_date?: string | null
          last_maintenance_date?: string | null
          location?: string | null
          maintenance_frequency_days?: number | null
          name: string
          next_calibration_date?: string | null
          next_maintenance_date?: string | null
          purchase_date?: string | null
          responsible_user_id?: string | null
          status?: string
          updated_at?: string
          warranty_expiration?: string | null
        }
        Update: {
          calibration_frequency_days?: number | null
          category?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          last_calibration_date?: string | null
          last_maintenance_date?: string | null
          location?: string | null
          maintenance_frequency_days?: number | null
          name?: string
          next_calibration_date?: string | null
          next_maintenance_date?: string | null
          purchase_date?: string | null
          responsible_user_id?: string | null
          status?: string
          updated_at?: string
          warranty_expiration?: string | null
        }
        Relationships: []
      }
      expiration_notifications: {
        Row: {
          created_at: string
          expiration_date: string
          id: string
          item_id: string
          item_title: string
          item_type: string
          last_notification_date: string | null
          notification_days_before: number | null
          notification_sent: boolean | null
          responsible_user_id: string | null
        }
        Insert: {
          created_at?: string
          expiration_date: string
          id?: string
          item_id: string
          item_title: string
          item_type: string
          last_notification_date?: string | null
          notification_days_before?: number | null
          notification_sent?: boolean | null
          responsible_user_id?: string | null
        }
        Update: {
          created_at?: string
          expiration_date?: string
          id?: string
          item_id?: string
          item_title?: string
          item_type?: string
          last_notification_date?: string | null
          notification_days_before?: number | null
          notification_sent?: boolean | null
          responsible_user_id?: string | null
        }
        Relationships: []
      }
      maintenance_records: {
        Row: {
          completed_date: string | null
          cost: number | null
          created_at: string
          description: string | null
          equipment_id: string
          id: string
          notes: string | null
          record_type: string
          scheduled_date: string
          status: string
          technician_name: string | null
          updated_at: string
        }
        Insert: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          equipment_id: string
          id?: string
          notes?: string | null
          record_type: string
          scheduled_date: string
          status?: string
          technician_name?: string | null
          updated_at?: string
        }
        Update: {
          completed_date?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          equipment_id?: string
          id?: string
          notes?: string | null
          record_type?: string
          scheduled_date?: string
          status?: string
          technician_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_records_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      objective_comments: {
        Row: {
          action_description: string | null
          action_due_date: string | null
          action_required: boolean | null
          action_status: string | null
          comment_text: string
          created_at: string
          created_by: string | null
          id: string
          objective_id: string
        }
        Insert: {
          action_description?: string | null
          action_due_date?: string | null
          action_required?: boolean | null
          action_status?: string | null
          comment_text: string
          created_at?: string
          created_by?: string | null
          id?: string
          objective_id: string
        }
        Update: {
          action_description?: string | null
          action_due_date?: string | null
          action_required?: boolean | null
          action_status?: string | null
          comment_text?: string
          created_at?: string
          created_by?: string | null
          id?: string
          objective_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "objective_comments_objective_id_fkey"
            columns: ["objective_id"]
            isOneToOne: false
            referencedRelation: "objectives"
            referencedColumns: ["id"]
          },
        ]
      }
      objectives: {
        Row: {
          created_at: string
          current_value: number | null
          description: string | null
          id: string
          indicator_id: string | null
          responsible_user_id: string | null
          start_date: string
          status: string
          target_date: string
          target_value: number | null
          title: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_value?: number | null
          description?: string | null
          id?: string
          indicator_id?: string | null
          responsible_user_id?: string | null
          start_date: string
          status?: string
          target_date: string
          target_value?: number | null
          title: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_value?: number | null
          description?: string | null
          id?: string
          indicator_id?: string | null
          responsible_user_id?: string | null
          start_date?: string
          status?: string
          target_date?: string
          target_value?: number | null
          title?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
