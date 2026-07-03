import { createServerSupabaseClient } from '@/lib/supabase-server';

export class AuditService {
  /**
   * Automatically resolves the current user's profile ID and records an audit log entry.
   */
  async createLog(
    action: string,
    tableName: string,
    recordId: string,
    oldData: any = null,
    newData: any = null
  ) {
    try {
      const supabase = await createServerSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      let actorId: string | null = null;

      if (session?.user) {
        const { data: profile } = await supabase
          .from('member_profiles')
          .select('id')
          .eq('auth_id', session.user.id)
          .single();
        
        if (profile) {
          actorId = profile.id;
        }
      }

      // Fallback to system actor ID if no active user session (e.g. public/system operations)
      if (!actorId) {
        actorId = '5057e100-0000-4000-8000-000000000001';
      }

      const { error } = await supabase.from('audit_logs').insert({
        actor_id: actorId,
        action,
        table_name: tableName,
        record_id: recordId,
        old_data: oldData ? JSON.stringify(oldData) : null,
        new_data: newData ? JSON.stringify(newData) : null
      });

      if (error) throw error;
    } catch (error) {
      console.error('[AuditService.createLog] Failed to write audit log:', error);
    }
  }
}

export const auditService = new AuditService();
