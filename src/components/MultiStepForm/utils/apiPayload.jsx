export const leaseOptionPayload = [
  {
    id: 1, // EntityDto<int?> maps to a nullable integer ID
    start: "2023-01-01", // DateOnly as ISO string
    stop: "2023-12-31", // DateOnly as ISO string
    term: "1 Year Lease", // Required string
    details: "Initial lease term for office space",
    exerciseStart: "2023-06-01", // Nullable DateOnly
    exerciseStartEventId: "550e8400-e29b-41d4-a716-446655440000", // Nullable Guid
    exerciseStop: "2023-11-30", // Nullable DateOnly
    exerciseStopEventId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // Nullable Guid
    isCompleted: false, // Boolean
    leaseId: "123e4567-e89b-12d3-a456-426614174000", // Guid
    summary: "Office lease option 1",
    line: 1, // Short (int16)
    shortCode: "OFF1",
    isToBeExercised: true, // resonablyCertain
    isBaselineIFRS16Option: false, // startIFRS16
    ifrs16RecognitionDate: null, // IFRS16 Recognize From
    discRateAppType: 1, // Assuming an enum-like string
    discRateAppRateId: "987fcdeb-1234-5678-9abc-def012345678", // Nullable Guid
    discRateAppPercent: 5.5, // Nullable decimal
    discRateAssumptionPercent: 6.0, // Nullable decimal
    discRateAppDebtorType: "Variable", // Nullable enum-like string
    discRateAppDebtorRateId: null, // Nullable Guid
    discRateAppDebtorPercent: null, // Nullable decimal
    discRateAssumptionPercentDebtor: null, // Nullable decimal
  },
  {
    id: 2,
    start: "2024-01-01",
    stop: "2024-12-31",
    term: "Renewal Option 1",
    details: "First renewal option",
    exerciseStart: null,
    exerciseStartEventId: null,
    exerciseStop: null,
    exerciseStopEventId: null,
    isCompleted: false,
    leaseId: "123e4567-e89b-12d3-a456-426614174000",
    summary: "Renewal option for office",
    line: 2,
    shortCode: "REN1",
    isToBeExercised: false,
    isBaselineIFRS16Option: true,
    ifrs16RecognitionDate: "2024-01-01",
    discRateAppType: 0,
    discRateAppRateId: null,
    discRateAppPercent: null,
    discRateAssumptionPercent: 5.75,
    discRateAppDebtorType: null,
    discRateAppDebtorRateId: "abcdef12-3456-7890-abcd-ef1234567890",
    discRateAppDebtorPercent: 6.25,
    discRateAssumptionPercentDebtor: 6.5,
  },
  {
    id: 3,
    start: "2025-01-01",
    stop: "2025-06-30",
    term: "Short-Term Extension",
    details: "6-month extension option",
    exerciseStart: "2024-12-01",
    exerciseStartEventId: "11112222-3333-4444-5555-666677778888",
    exerciseStop: "2025-05-31",
    exerciseStopEventId: null,
    isCompleted: false,
    leaseId: "123e4567-e89b-12d3-a456-426614174000",
    summary: "Short-term lease extension",
    line: 3,
    shortCode: "EXT1",
    isToBeExercised: true,
    isBaselineIFRS16Option: false,
    ifrs16RecognitionDate: null,
    discRateAppType: null,
    discRateAppRateId: null,
    discRateAppPercent: null,
    discRateAssumptionPercent: null,
    discRateAppDebtorType: 2,
    discRateAppDebtorRateId: "9999aaaa-bbbb-cccc-dddd-eeeeffff1111",
    discRateAppDebtorPercent: 5.0,
    discRateAssumptionPercentDebtor: null,
  },
  {
    id: 4,
    start: "2025-07-01",
    stop: "2026-06-30",
    term: "Final Renewal",
    details: "Final lease renewal option",
    exerciseStart: null,
    exerciseStartEventId: null,
    exerciseStop: null,
    exerciseStopEventId: null,
    isCompleted: true,
    leaseId: "123e4567-e89b-12d3-a456-426614174000",
    summary: "Completed renewal option",
    line: 4,
    shortCode: "REN2",
    isToBeExercised: false,
    isBaselineIFRS16Option: true,
    ifrs16RecognitionDate: "2025-07-01",
    discRateAppType: 1,
    discRateAppRateId: "abcd1234-5678-90ab-cdef-1234567890ab",
    discRateAppPercent: 4.75,
    discRateAssumptionPercent: 5.0,
    discRateAppDebtorType: null,
    discRateAppDebtorRateId: null,
    discRateAppDebtorPercent: null,
    discRateAssumptionPercentDebtor: null,
  },
];

