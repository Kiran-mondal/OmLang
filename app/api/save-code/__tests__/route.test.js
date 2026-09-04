import { POST } from '../route';
import sql from '../../../../lib/db';
import { runOmLang } from '../../../../lib/omlang/Engine';

// Mock dependencies
jest.mock('../../../../lib/db', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../../lib/omlang/Engine', () => ({
  runOmLang: jest.fn(),
}));

jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: jest.fn((body, init) => {
        return {
          status: init?.status || 200,
          json: async () => body,
        };
      }),
    },
  };
});

describe('POST /api/save-code', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 500 when database throws an error', async () => {
    // Arrange
    const mockCode = 'print("Hello");';
    const mockTitle = 'Test Snippet';
    const request = {
      json: jest.fn().mockResolvedValue({ title: mockTitle, code: mockCode }),
    };

    runOmLang.mockReturnValue({ success: true, result: 'Hello' });

    const dbError = new Error('Database connection failed');
    sql.mockRejectedValueOnce(dbError);

    // Spy on console.error to avoid polluting test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Act
    const response = await POST(request);

    // Assert
    expect(sql).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Database Error:', dbError);
    expect(response.status).toBe(500);

    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Failed to save code to the database.' });

    consoleSpy.mockRestore();
  });
});
