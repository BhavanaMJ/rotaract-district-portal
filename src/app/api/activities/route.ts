import { NextRequest, NextResponse } from 'next/server';
import { activityService } from '@/services/activity.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const sortColumn = searchParams.get('sortColumn') || undefined;
    const sortAsc = searchParams.get('sortAsc') === 'true';
    const search = searchParams.get('search') || undefined;
    const filterClubId = searchParams.get('club_id') || undefined;
    const id = searchParams.get('id') || undefined;

    if (id) {
      const result = await activityService.getById(id);
      return NextResponse.json(result);
    }

    const options: any = {
      pagination: { page, pageSize },
    };

    if (sortColumn) {
      options.sort = { column: sortColumn, ascending: sortAsc };
    }

    if (search) {
      options.search = { query: search, columns: ['title', 'description'] };
    }

    if (filterClubId) {
      options.filters = { club_id: filterClubId };
    }

    const result = await activityService.findMany(options);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('GET /api/activities error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
