const { useState, useEffect } = React;
const { Calendar, Clock, Users, MapPin, CheckCircle, AlertCircle, Edit2, Save, X } = lucide;

const PipelineScheduleTracker = () => {
  const [activities, setActivities] = useState([
    // Material Procurement Phase
    { id: '1.0', name: 'MATERIAL PROCUREMENT PHASE', phase: 'procurement', quantity: '-', duration: 35, startDate: '2025-07-07', endDate: '2025-07-31', predecessor: '-', resources: '-', remarks: 'Extended for larger scope', isPhaseHeader: true, progress: 0 },
    { id: '1.1', name: 'Procure 16" MS ERW Pipes (IS 3589, Grade 410)', phase: 'procurement', quantity: '960 RMT', duration: 30, startDate: '2025-07-07', endDate: '2025-07-28', predecessor: '-', resources: 'Procurement Team', remarks: '80 pieces × 12m, TATA/JINDAL/SAIL', progress: 0 },
    { id: '1.2', name: 'Procure CS Bends (1.5D, 3D, 5D)', phase: 'procurement', quantity: '15 Nos', duration: 25, startDate: '2025-07-07', endDate: '2025-07-24', predecessor: '-', resources: 'Procurement Team', remarks: '5 each type, Schedule 40', progress: 0 },
    { id: '1.3', name: 'Procure Welding Consumables (7018 Electrodes)', phase: 'procurement', quantity: 'As reqd', duration: 10, startDate: '2025-07-07', endDate: '2025-07-13', predecessor: '-', resources: 'Procurement Team', remarks: 'For 95 joints + bends', progress: 0 },
    { id: '1.4', name: 'Procure Coating Materials (Pypstik Primer & IWL Tape)', phase: 'procurement', quantity: '1293.15 m²', duration: 20, startDate: '2025-07-07', endDate: '2025-07-20', predecessor: '-', resources: 'Procurement Team', remarks: '4mm thick tape, IS 10221', progress: 0 },
    { id: '1.5', name: 'Procure RCC Materials (M30 Concrete)', phase: 'procurement', quantity: '45 m³', duration: 15, startDate: '2025-07-16', endDate: '2025-07-26', predecessor: '-', resources: 'Procurement Team', remarks: 'For road crossings', progress: 0 },
    { id: '1.6', name: 'Procure WMM Materials', phase: 'procurement', quantity: '67.5 m³', duration: 15, startDate: '2025-07-21', endDate: '2025-07-31', predecessor: '-', resources: 'Procurement Team', remarks: 'Crushed aggregates', progress: 0 },
    
    // Mobilization Phase
    { id: '2.0', name: 'MOBILIZATION & SITE PREPARATION', phase: 'mobilization', quantity: '-', duration: 10, startDate: '2025-07-29', endDate: '2025-08-04', predecessor: '1.3', resources: '-', remarks: 'Extended for larger site', isPhaseHeader: true, progress: 0 },
    { id: '2.1', name: 'Equipment Mobilization', phase: 'mobilization', quantity: '-', duration: 4, startDate: '2025-07-29', endDate: '2025-07-31', predecessor: '1.3', resources: 'Transport Team', remarks: 'Multiple hydras, excavators', progress: 0 },
    { id: '2.2', name: 'Site Office & Storage Setup (Multiple Locations)', phase: 'mobilization', quantity: '-', duration: 3, startDate: '2025-07-31', endDate: '2025-08-02', predecessor: '2.1', resources: 'Site Team (8)', remarks: 'Main & satellite yards', progress: 0 },
    { id: '2.3', name: 'Safety Setup & Road Crossing Permits', phase: 'mobilization', quantity: '-', duration: 3, startDate: '2025-08-03', endDate: '2025-08-04', predecessor: '2.2', resources: 'Safety Officer', remarks: '3 road crossing permits', progress: 0 },
    
    // Pipeline Removal Phase
    { id: '3.0', name: 'EXISTING PIPELINE REMOVAL', phase: 'removal', quantity: '960 RMT', duration: 25, startDate: '2025-08-05', endDate: '2025-08-23', predecessor: '2.3', resources: '-', remarks: 'BOQ Item 1', isPhaseHeader: true, progress: 0 },
    { id: '3.1', name: 'Pipeline Cutting - Section 1 (6m lengths)', phase: 'removal', quantity: '320 RMT', duration: 8, startDate: '2025-08-05', endDate: '2025-08-10', predecessor: '2.3', resources: 'Cutting Crew (8)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '3.2', name: 'Pipeline Cutting - Section 2', phase: 'removal', quantity: '320 RMT', duration: 8, startDate: '2025-08-11', endDate: '2025-08-16', predecessor: '3.1', resources: 'Cutting Crew (8)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '3.3', name: 'Pipeline Cutting - Section 3', phase: 'removal', quantity: '320 RMT', duration: 8, startDate: '2025-08-17', endDate: '2025-08-22', predecessor: '3.2', resources: 'Cutting Crew (8)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '3.4', name: 'Lifting, Loading & Transport (Progressive)', phase: 'removal', quantity: '160 pieces', duration: 20, startDate: '2025-08-08', endDate: '2025-08-22', predecessor: '3.1FS+4d', resources: '2 Hydras, Labor (12)', remarks: 'Continuous operation', progress: 0 },
    { id: '3.5', name: 'Stacking at TC Store Yard', phase: 'removal', quantity: '960 RMT', duration: 18, startDate: '2025-08-09', endDate: '2025-08-22', predecessor: '3.4SS+2d', resources: 'Labor (8)', remarks: 'Organized stacking', progress: 0 },
    { id: '3.6', name: 'Site Clearance & Cleanup', phase: 'removal', quantity: '-', duration: 1, startDate: '2025-08-23', endDate: '2025-08-23', predecessor: '3.5', resources: 'Labor (6)', remarks: 'Route preparation', progress: 0 },
    
    // Earthwork Phase
    { id: '4.0', name: 'EARTHWORK - EXCAVATION', phase: 'earthwork', quantity: '3,015 m³', duration: 28, startDate: '2025-08-23', endDate: '2025-09-12', predecessor: '3.6', resources: '-', remarks: 'BOQ Item 8', isPhaseHeader: true, progress: 0 },
    { id: '4.1', name: 'Pipeline Route Excavation - Section 1', phase: 'earthwork', quantity: '960 m³', duration: 8, startDate: '2025-08-23', endDate: '2025-08-28', predecessor: '3.6', resources: 'Excavators (3), Labor (12)', remarks: '1.5m W × 2m D', isCritical: true, progress: 0 },
    { id: '4.2', name: 'Pipeline Route Excavation - Section 2', phase: 'earthwork', quantity: '960 m³', duration: 8, startDate: '2025-08-29', endDate: '2025-09-03', predecessor: '4.1', resources: 'Excavators (3), Labor (12)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '4.3', name: 'Pipeline Route Excavation - Section 3', phase: 'earthwork', quantity: '960 m³', duration: 8, startDate: '2025-09-04', endDate: '2025-09-09', predecessor: '4.2', resources: 'Excavators (3), Labor (12)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '4.4', name: 'Road Crossing Excavations (3 Locations)', phase: 'earthwork', quantity: '135 m³', duration: 4, startDate: '2025-09-10', endDate: '2025-09-12', predecessor: '4.3', resources: 'Excavator, Labor (8)', remarks: '15m × 1.5m × 2m each', progress: 0 },
    
    // Material Delivery Phase
    { id: '5.0', name: 'MATERIAL DELIVERY TO SITE', phase: 'procurement', quantity: '-', duration: 7, startDate: '2025-07-29', endDate: '2025-08-02', predecessor: '1.1', resources: '-', remarks: 'Phased delivery', isPhaseHeader: true, progress: 0 },
    { id: '5.1', name: 'MS Pipe Delivery & Inspection', phase: 'procurement', quantity: '960 RMT', duration: 7, startDate: '2025-07-29', endDate: '2025-08-02', predecessor: '1.1', resources: 'QC Team (3)', remarks: 'With test certificates', progress: 0 },
    { id: '5.2', name: 'Bends Delivery & Inspection', phase: 'procurement', quantity: '15 Nos', duration: 2, startDate: '2025-07-25', endDate: '2025-07-26', predecessor: '1.2', resources: 'QC Team (2)', remarks: 'Dimensional check', progress: 0 },
    
    // Pipeline Installation Phase
    { id: '6.0', name: 'NEW PIPELINE INSTALLATION', phase: 'pipeline', quantity: '960 RMT', duration: 45, startDate: '2025-08-31', endDate: '2025-10-02', predecessor: '4.1FS+10d,5.1', resources: '-', remarks: 'BOQ Item 2', isPhaseHeader: true, progress: 0 },
    { id: '6.1', name: 'Pipe Stringing - Section 1', phase: 'pipeline', quantity: '320 RMT', duration: 5, startDate: '2025-08-31', endDate: '2025-09-03', predecessor: '4.1FS+10d,5.1', resources: '2 Hydras, Labor (10)', remarks: 'Progressive with excavation', progress: 0 },
    { id: '6.2', name: 'Pipe Stringing - Section 2', phase: 'pipeline', quantity: '320 RMT', duration: 5, startDate: '2025-09-06', endDate: '2025-09-08', predecessor: '4.2FS+10d', resources: '2 Hydras, Labor (10)', remarks: 'Progressive', progress: 0 },
    { id: '6.3', name: 'Pipe Stringing - Section 3', phase: 'pipeline', quantity: '320 RMT', duration: 5, startDate: '2025-09-11', endDate: '2025-09-14', predecessor: '4.3FS+10d', resources: '2 Hydras, Labor (10)', remarks: 'Progressive', progress: 0 },
    { id: '6.4', name: 'Joint Preparation & Fit-up (Progressive)', phase: 'pipeline', quantity: '80 joints', duration: 12, startDate: '2025-09-03', endDate: '2025-09-11', predecessor: '6.1FS+5d', resources: 'Fitters (8)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '6.5', name: 'TIG Root Welding (Progressive)', phase: 'pipeline', quantity: '80 joints', duration: 20, startDate: '2025-09-05', endDate: '2025-09-19', predecessor: '6.4SS+2d', resources: 'TIG Welders (6)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '6.6', name: 'Arc Filling (7018 Electrode)', phase: 'pipeline', quantity: '80 joints', duration: 20, startDate: '2025-09-08', endDate: '2025-09-22', predecessor: '6.5FS+5d', resources: 'Arc Welders (10)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    { id: '6.7', name: 'Radiography Testing (100% Joints)', phase: 'pipeline', quantity: '80 joints', duration: 15, startDate: '2025-09-12', endDate: '2025-09-22', predecessor: '6.6FS+5d', resources: 'NDT Team (4)', remarks: 'Progressive testing', progress: 0 },
    { id: '6.8', name: 'Joint Repairs (if required)', phase: 'pipeline', quantity: '10%', duration: 5, startDate: '2025-09-23', endDate: '2025-09-26', predecessor: '6.7', resources: 'Welders (6)', remarks: 'Contingency', progress: 0 },
    { id: '6.9', name: 'Pipe Lowering into Trench', phase: 'pipeline', quantity: '960 RMT', duration: 8, startDate: '2025-09-27', endDate: '2025-10-02', predecessor: '6.8', resources: '2 Hydras, Labor (15)', remarks: 'Critical Path', isCritical: true, progress: 0 },
    
    // Bends Installation Phase
    { id: '7.0', name: 'BENDS INSTALLATION', phase: 'bends', quantity: '15 Nos', duration: 10, startDate: '2025-10-03', endDate: '2025-10-09', predecessor: '6.9', resources: '-', remarks: 'BOQ Item 7', isPhaseHeader: true, progress: 0 },
    { id: '7.1', name: 'Install 1.5D Bends', phase: 'bends', quantity: '5 Nos', duration: 4, startDate: '2025-10-03', endDate: '2025-10-05', predecessor: '6.9', resources: 'Welders (6)', remarks: 'Including welding', progress: 0 },
    { id: '7.2', name: 'Install 3D Bends', phase: 'bends', quantity: '5 Nos', duration: 3, startDate: '2025-10-06', endDate: '2025-10-07', predecessor: '7.1', resources: 'Welders (6)', remarks: 'Including welding', progress: 0 },
    { id: '7.3', name: 'Install 5D Bends', phase: 'bends', quantity: '5 Nos', duration: 3, startDate: '2025-10-08', endDate: '2025-10-09', predecessor: '7.2', resources: 'Welders (6)', remarks: 'Including welding', progress: 0 },
    
    // Coating & Wrapping Phase
    { id: '8.0', name: 'COATING & WRAPPING', phase: 'coating', quantity: '1,293.15 m²', duration: 22, startDate: '2025-09-19', endDate: '2025-10-05', predecessor: '6.7FS+10d', resources: '-', remarks: 'BOQ Item 5', isPhaseHeader: true, progress: 0 },
    { id: '8.1', name: 'Surface Preparation - Pipes', phase: 'coating', quantity: '1,257.6 m²', duration: 8, startDate: '2025-09-19', endDate: '2025-09-25', predecessor: '6.7FS+10d', resources: 'Coating Team (10)', remarks: 'Wire brush/buffing', progress: 0 },
    { id: '8.2', name: 'Surface Preparation - Bends', phase: 'coating', quantity: '35.55 m²', duration: 2, startDate: '2025-10-10', endDate: '2025-10-11', predecessor: '7.3', resources: 'Coating Team (4)', remarks: 'All bend types', progress: 0 },
    { id: '8.3', name: 'Coal Tar Epoxy Application - Pipes', phase: 'coating', quantity: '1,257.6 m²', duration: 8, startDate: '2025-09-25', endDate: '2025-09-30', predecessor: '8.1', resources: 'Coating Team (10)', remarks: '100 micron DFT', progress: 0 },
    { id: '8.4', name: 'Coal Tar Epoxy Application - Bends', phase: 'coating', quantity: '35.55 m²', duration: 2, startDate: '2025-10-12', endDate: '2025-10-12', predecessor: '8.2', resources: 'Coating Team (4)', remarks: '100 micron DFT', progress: 0 },
    { id: '8.5', name: 'IWL Cold Tape Application - Pipes', phase: 'coating', quantity: '1,257.6 m²', duration: 8, startDate: '2025-10-01', endDate: '2025-10-06', predecessor: '8.3', resources: 'Coating Team (10)', remarks: '25-40 micron DFT', progress: 0 },
    { id: '8.6', name: 'IWL Cold Tape Application - Bends', phase: 'coating', quantity: '35.55 m²', duration: 2, startDate: '2025-10-13', endDate: '2025-10-14', predecessor: '8.4', resources: 'Coating Team (4)', remarks: '25-40 micron DFT', progress: 0 },
    { id: '8.7', name: 'Holiday Testing (IS:15337)', phase: 'coating', quantity: '1,293.15 m²', duration: 3, startDate: '2025-10-07', endDate: '2025-10-09', predecessor: '8.5FS-2d', resources: 'QC Team (3)', remarks: 'High voltage detector', progress: 0 },
    
    // Backfilling Phase
    { id: '9.0', name: 'BACKFILLING & COMPACTION', phase: 'earthwork', quantity: '3,015 m³', duration: 15, startDate: '2025-10-07', endDate: '2025-10-17', predecessor: '8.5FS+8d', resources: '-', remarks: 'BOQ Item 9', isPhaseHeader: true, progress: 0 },
    { id: '9.1', name: 'Pipeline Route Backfilling', phase: 'earthwork', quantity: '2,880 m³', duration: 12, startDate: '2025-10-07', endDate: '2025-10-15', predecessor: '8.5FS+8d', resources: 'Excavators (3), Labor (15)', remarks: '200-300mm layers', progress: 0 },
    { id: '9.2', name: 'Compaction & Watering', phase: 'earthwork', quantity: '2,880 m³', duration: 12, startDate: '2025-10-07', endDate: '2025-10-15', predecessor: '9.1SS', resources: 'Compactors (3), Labor (8)', remarks: 'Progressive with backfill', progress: 0 },
    { id: '9.3', name: 'Road Crossing Backfilling', phase: 'earthwork', quantity: '135 m³', duration: 3, startDate: '2025-10-16', endDate: '2025-10-17', predecessor: '9.2', resources: 'Excavator, Labor (8)', remarks: 'Special compaction', progress: 0 },
    
    // Road Crossing Civil Works
    { id: '10.0', name: 'ROAD CROSSING CIVIL WORKS', phase: 'civil', quantity: '3 Locations', duration: 18, startDate: '2025-10-18', endDate: '2025-10-31', predecessor: '9.3', resources: '-', remarks: 'BOQ Items 10,11,12', isPhaseHeader: true, progress: 0 },
    { id: '10.1', name: 'Shuttering Works', phase: 'civil', quantity: '96 m²', duration: 4, startDate: '2025-10-18', endDate: '2025-10-20', predecessor: '9.3', resources: 'Carpenters (6)', remarks: '3 road crossings', progress: 0 },
    { id: '10.2', name: 'RCC M30 Concrete Pouring', phase: 'civil', quantity: '45 m³', duration: 3, startDate: '2025-10-21', endDate: '2025-10-23', predecessor: '10.1', resources: 'Concrete Team (12)', remarks: '15m × 1m × 1m each', progress: 0 },
    { id: '10.3', name: 'Concrete Curing', phase: 'civil', quantity: '-', duration: 14, startDate: '2025-10-23', endDate: '2025-11-02', predecessor: '10.2', resources: 'Labor (3)', remarks: 'Minimum 14 days', progress: 0 },
    { id: '10.4', name: 'Shuttering Removal', phase: 'civil', quantity: '96 m²', duration: 2, startDate: '2025-10-28', endDate: '2025-10-29', predecessor: '10.2FS+7d', resources: 'Labor (6)', remarks: 'After 7 days', progress: 0 },
    { id: '10.5', name: 'WMM Laying & Compaction', phase: 'civil', quantity: '67.5 m³', duration: 3, startDate: '2025-10-29', endDate: '2025-10-31', predecessor: '10.4', resources: 'Paver, Roller, Labor (10)', remarks: 'As per MORTH 406', progress: 0 },
    
    // Testing Phase
    { id: '11.0', name: 'HYDROSTATIC TESTING', phase: 'testing', quantity: '960 RMT', duration: 10, startDate: '2025-10-14', endDate: '2025-10-21', predecessor: '8.7', resources: '-', remarks: 'BOQ Item 6', isPhaseHeader: true, progress: 0 },
    { id: '11.1', name: 'Test Section Preparation', phase: 'testing', quantity: '-', duration: 2, startDate: '2025-10-14', endDate: '2025-10-15', predecessor: '8.7', resources: 'Test Team (6)', remarks: 'Install test equipment', progress: 0 },
    { id: '11.2', name: 'Water Filling (Section-wise)', phase: 'testing', quantity: '960 RMT', duration: 3, startDate: '2025-10-16', endDate: '2025-10-17', predecessor: '11.1', resources: 'Test Team (6)', remarks: 'Progressive filling', progress: 0 },
    { id: '11.3', name: 'Pressure Testing & Hold', phase: 'testing', quantity: '24 hrs', duration: 2, startDate: '2025-10-18', endDate: '2025-10-19', predecessor: '11.2', resources: 'Test Team (4)', remarks: '1.5x design pressure', isCritical: true, progress: 0 },
    { id: '11.4', name: 'Dewatering & Drying', phase: 'testing', quantity: '-', duration: 3, startDate: '2025-10-20', endDate: '2025-10-21', predecessor: '11.3', resources: 'Test Team (6)', remarks: 'Air purging', progress: 0 },
    
    // Final Activities
    { id: '12.0', name: 'FINAL ACTIVITIES & HANDOVER', phase: 'demob', quantity: '-', duration: 8, startDate: '2025-10-31', endDate: '2025-11-06', predecessor: '10.5,11.4', resources: '-', remarks: 'Project Completion', isPhaseHeader: true, progress: 0 },
    { id: '12.1', name: 'Final Inspection & Punch List', phase: 'demob', quantity: '-', duration: 2, startDate: '2025-10-31', endDate: '2025-11-01', predecessor: '10.5,11.4', resources: 'Client, QC Team', remarks: 'Complete route inspection', progress: 0 },
    { id: '12.2', name: 'Documentation & As-Built Drawings', phase: 'demob', quantity: '-', duration: 3, startDate: '2025-11-02', endDate: '2025-11-03', predecessor: '12.1', resources: 'Engineering Team', remarks: 'All test certificates', progress: 0 },
    { id: '12.3', name: 'Site Cleanup & Restoration', phase: 'demob', quantity: '-', duration: 2, startDate: '2025-11-04', endDate: '2025-11-05', predecessor: '12.2', resources: 'Labor (15)', remarks: 'Environmental compliance', progress: 0 },
    { id: '12.4', name: 'Equipment Demobilization & Handover', phase: 'demob', quantity: '-', duration: 2, startDate: '2025-11-05', endDate: '2025-11-06', predecessor: '12.3FS-1d', resources: 'All Teams', remarks: 'Project End', isCritical: true, progress: 0 }
  ]);

  const [editingActivity, setEditingActivity] = useState(null);
  const [updatedActivities, setUpdatedActivities] = useState(new Set());
  const [projectStats, setProjectStats] = useState({
    totalActivities: 0,
    completedActivities: 0,
    inProgressActivities: 0,
    overallProgress: 0
  });

  useEffect(() => {
    const totalActivities = activities.filter(a => !a.isPhaseHeader).length;
    const completedActivities = activities.filter(a => !a.isPhaseHeader && a.progress === 100).length;
    const inProgressActivities = activities.filter(a => !a.isPhaseHeader && a.progress > 0 && a.progress < 100).length;
    const overallProgress = Math.round((activities.reduce((sum, a) => sum + (a.isPhaseHeader ? 0 : a.progress), 0) / totalActivities) || 0);
    
    setProjectStats({
      totalActivities,
      completedActivities,
      inProgressActivities,
      overallProgress
    });
  }, [activities]);

  const phaseColors = {
    procurement: 'bg-blue-100 border-blue-300',
    mobilization: 'bg-indigo-100 border-indigo-300',
    removal: 'bg-red-100 border-red-300',
    earthwork: 'bg-yellow-100 border-yellow-300',
    pipeline: 'bg-green-100 border-green-300',
    bends: 'bg-purple-100 border-purple-300',
    coating: 'bg-violet-100 border-violet-300',
    testing: 'bg-blue-200 border-blue-400',
    civil: 'bg-pink-100 border-pink-300',
    road: 'bg-orange-100 border-orange-300',
    demob: 'bg-gray-100 border-gray-300'
  };

  const updateActivity = (id, field, value) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  const calculateEndDate = (startDate, duration) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + duration - 1);
    return end.toISOString().split('T')[0];
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
  };

  const parsePredecessor = (predecessor) => {
    if (!predecessor || predecessor === '-') return [];
    
    // Handle multiple predecessors separated by commas
    return predecessor.split(',').map(pred => {
      const trimmed = pred.trim();
      // Handle finish-to-start relationships with lag (e.g., "4.1FS+10d")
      if (trimmed.includes('FS+')) {
        const [activityId, lag] = trimmed.split('FS+');
        return { id: activityId, type: 'FS', lag: parseInt(lag.replace('d', '')) || 0 };
      }
      // Handle start-to-start relationships (e.g., "3.4SS+2d")
      if (trimmed.includes('SS+')) {
        const [activityId, lag] = trimmed.split('SS+');
        return { id: activityId, type: 'SS', lag: parseInt(lag.replace('d', '')) || 0 };
      }
      // Handle finish-to-start with negative lag (e.g., "12.3FS-1d")
      if (trimmed.includes('FS-')) {
        const [activityId, lag] = trimmed.split('FS-');
        return { id: activityId, type: 'FS', lag: -parseInt(lag.replace('d', '')) || 0 };
      }
      // Default finish-to-start relationship
      return { id: trimmed, type: 'FS', lag: 0 };
    });
  };

  const updateDependentActivities = (changedActivityId, newEndDate, updatedActivities, changedIds = new Set()) => {
    const dependents = updatedActivities.filter(activity => {
      const predecessors = parsePredecessor(activity.predecessor);
      return predecessors.some(pred => pred.id === changedActivityId);
    });

    dependents.forEach(dependent => {
      const predecessors = parsePredecessor(dependent.predecessor);
      let newStartDate = dependent.startDate;
      
      // Calculate the earliest start date based on all predecessors
      predecessors.forEach(pred => {
        const predActivity = updatedActivities.find(a => a.id === pred.id);
        if (predActivity) {
          let requiredStartDate;
          if (pred.type === 'FS') {
            // Finish-to-start: start after predecessor finishes + lag
            requiredStartDate = addDays(predActivity.endDate, pred.lag + 1);
          } else if (pred.type === 'SS') {
            // Start-to-start: start after predecessor starts + lag
            requiredStartDate = addDays(predActivity.startDate, pred.lag);
          }
          
          // Use the latest required start date
          if (new Date(requiredStartDate) > new Date(newStartDate)) {
            newStartDate = requiredStartDate;
          }
        }
      });

      // Update the dependent activity if the start date changed
      if (newStartDate !== dependent.startDate) {
        const newEndDate = calculateEndDate(newStartDate, dependent.duration);
        const updatedIndex = updatedActivities.findIndex(a => a.id === dependent.id);
        if (updatedIndex !== -1) {
          updatedActivities[updatedIndex] = {
            ...updatedActivities[updatedIndex],
            startDate: newStartDate,
            endDate: newEndDate
          };
          
          // Track this activity as changed
          changedIds.add(dependent.id);
          
          // Recursively update activities that depend on this one
          updateDependentActivities(dependent.id, newEndDate, updatedActivities, changedIds);
        }
      }
    });
  };

  const handleDurationChange = (id, newDuration) => {
    setActivities(prev => {
      const updatedActivities = [...prev];
      const activityIndex = updatedActivities.findIndex(a => a.id === id);
      const changedIds = new Set([id]);
      
      if (activityIndex !== -1) {
        const activity = updatedActivities[activityIndex];
        const newEndDate = calculateEndDate(activity.startDate, newDuration);
        
        // Update the current activity
        updatedActivities[activityIndex] = {
          ...activity,
          duration: newDuration,
          endDate: newEndDate
        };
        
        // Update all dependent activities and track which ones changed
        updateDependentActivities(id, newEndDate, updatedActivities, changedIds);
      }
      
      // Highlight updated activities briefly
      setUpdatedActivities(changedIds);
      setTimeout(() => setUpdatedActivities(new Set()), 2000);
      
      return updatedActivities;
    });
  };

  const handleStartDateChange = (id, newStartDate) => {
    setActivities(prev => {
      const updatedActivities = [...prev];
      const activityIndex = updatedActivities.findIndex(a => a.id === id);
      const changedIds = new Set([id]);
      
      if (activityIndex !== -1) {
        const activity = updatedActivities[activityIndex];
        const newEndDate = calculateEndDate(newStartDate, activity.duration);
        
        // Update the current activity
        updatedActivities[activityIndex] = {
          ...activity,
          startDate: newStartDate,
          endDate: newEndDate
        };
        
        // Update all dependent activities and track which ones changed
        updateDependentActivities(id, newEndDate, updatedActivities, changedIds);
      }
      
      // Highlight updated activities briefly
      setUpdatedActivities(changedIds);
      setTimeout(() => setUpdatedActivities(new Set()), 2000);
      
      return updatedActivities;
    });
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-gray-200';
    if (progress < 50) return 'bg-yellow-400';
    if (progress < 100) return 'bg-blue-400';
    return 'bg-green-400';
  };

  const getStatusIcon = (progress) => {
    if (progress === 100) return React.createElement(CheckCircle, { className: "w-4 h-4 text-green-600" });
    if (progress > 0) return React.createElement(Clock, { className: "w-4 h-4 text-blue-600" });
    return React.createElement(AlertCircle, { className: "w-4 h-4 text-gray-400" });
  };

  const EditableCell = ({ value, onSave, type = 'text' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
      onSave(type === 'number' ? parseInt(editValue) : editValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditValue(value);
      setIsEditing(false);
    };

    if (isEditing) {
      return React.createElement('div', { className: "flex items-center gap-1" },
        React.createElement('input', {
          type: type,
          value: editValue,
          onChange: (e) => setEditValue(e.target.value),
          className: "w-full px-2 py-1 text-xs border rounded",
          onKeyPress: (e) => e.key === 'Enter' && handleSave()
        }),
        React.createElement('button', {
          onClick: handleSave,
          className: "p-1 text-green-600 hover:bg-green-100 rounded"
        }, React.createElement(Save, { className: "w-3 h-3" })),
        React.createElement('button', {
          onClick: handleCancel,
          className: "p-1 text-red-600 hover:bg-red-100 rounded"
        }, React.createElement(X, { className: "w-3 h-3" }))
      );
    }

    return React.createElement('div', { className: "flex items-center gap-1 group" },
      React.createElement('span', { className: "text-xs" }, value),
      React.createElement('button', {
        onClick: () => setIsEditing(true),
        className: "opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 rounded"
      }, React.createElement(Edit2, { className: "w-3 h-3" }))
    );
  };

  return React.createElement('div', { className: "max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen" },
    // Notification for Auto-Updates
    updatedActivities.size > 0 && React.createElement('div', { 
      className: "fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 slide-in" 
    },
      React.createElement('div', { className: "flex items-center gap-2" },
        React.createElement(Clock, { className: "w-4 h-4" }),
        React.createElement('span', { className: "text-sm" },
          `${updatedActivities.size} activities auto-updated due to dependency changes`
        )
      )
    ),

    // Header
    React.createElement('div', { className: "bg-blue-900 text-white p-6 rounded-t-lg" },
      React.createElement('h1', { className: "text-xl font-bold mb-2" }, "ADANI KRISHNAPATNAM PORT LTD."),
      React.createElement('h2', { className: "text-sm mb-4 text-blue-100" }, "Maintenance of Santhoshimatha MS Oil Pipeline at Zero Point - Dynamic Schedule"),
      
      React.createElement('div', { className: "grid grid-cols-4 gap-4 text-sm" },
        React.createElement('div', null,
          React.createElement('span', { className: "text-blue-200 text-xs uppercase" }, "Project Start"),
          React.createElement('div', { className: "font-semibold" }, "July 7, 2025")
        ),
        React.createElement('div', null,
          React.createElement('span', { className: "text-blue-200 text-xs uppercase" }, "Project End"),
          React.createElement('div', { className: "font-semibold" }, "November 06, 2025")
        ),
        React.createElement('div', null,
          React.createElement('span', { className: "text-blue-200 text-xs uppercase" }, "Total Duration"),
          React.createElement('div', { className: "font-semibold" }, "122 Days (~4.1 Months)")
        ),
        React.createElement('div', null,
          React.createElement('span', { className: "text-blue-200 text-xs uppercase" }, "Pipeline Length"),
          React.createElement('div', { className: "font-semibold" }, "960 RMT (16\" Dia)")
        )
      )
    ),

    // Project Stats Dashboard
    React.createElement('div', { className: "bg-white border-x border-gray-200 p-4" },
      React.createElement('div', { className: "grid grid-cols-4 gap-4 mb-4" },
        React.createElement('div', { className: "bg-blue-50 p-3 rounded-lg" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement(Clock, { className: "w-5 h-5 text-blue-600" }),
            React.createElement('span', { className: "text-sm font-medium" }, "Overall Progress")
          ),
          React.createElement('div', { className: "text-2xl font-bold text-blue-600" }, `${projectStats.overallProgress}%`)
        ),
        React.createElement('div', { className: "bg-green-50 p-3 rounded-lg" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement(CheckCircle, { className: "w-5 h-5 text-green-600" }),
            React.createElement('span', { className: "text-sm font-medium" }, "Completed")
          ),
          React.createElement('div', { className: "text-2xl font-bold text-green-600" }, projectStats.completedActivities)
        ),
        React.createElement('div', { className: "bg-yellow-50 p-3 rounded-lg" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement(AlertCircle, { className: "w-5 h-5 text-yellow-600" }),
            React.createElement('span', { className: "text-sm font-medium" }, "In Progress")
          ),
          React.createElement('div', { className: "text-2xl font-bold text-yellow-600" }, projectStats.inProgressActivities)
        ),
        React.createElement('div', { className: "bg-gray-50 p-3 rounded-lg" },
          React.createElement('div', { className: "flex items-center gap-2" },
            React.createElement(Users, { className: "w-5 h-5 text-gray-600" }),
            React.createElement('span', { className: "text-sm font-medium" }, "Total Activities")
          ),
          React.createElement('div', { className: "text-2xl font-bold text-gray-600" }, projectStats.totalActivities)
        )
      ),
      
      // Overall Progress Bar
      React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-3" },
        React.createElement('div', { 
          className: "bg-blue-600 h-3 rounded-full transition-all duration-300",
          style: { width: `${projectStats.overallProgress}%` }
        })
      )
    ),

    // Schedule Table
    React.createElement('div', { className: "bg-white rounded-b-lg border border-gray-200 overflow-hidden" },
      React.createElement('div', { className: "overflow-x-auto" },
        React.createElement('table', { className: "w-full text-xs" },
          React.createElement('thead', { className: "bg-blue-800 text-white sticky top-0" },
            React.createElement('tr', null,
              React.createElement('th', { className: "px-3 py-2 text-left" }, "ID"),
              React.createElement('th', { className: "px-3 py-2 text-left min-w-64" }, "Activity Description"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "Quantity"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "Duration"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "Start Date"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "End Date"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "Progress"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "Status"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "Resources"),
              React.createElement('th', { className: "px-3 py-2 text-left" }, "Remarks")
            )
          ),
          React.createElement('tbody', null,
            activities.map((activity) => 
              React.createElement('tr', { 
                key: activity.id,
                className: `border-b border-gray-100 hover:bg-gray-50 transition-all duration-500 ${
                  activity.isPhaseHeader 
                    ? 'bg-gray-100 font-semibold' 
                    : phaseColors[activity.phase]
                } ${activity.isCritical ? 'border-l-4 border-red-500' : ''} ${
                  updatedActivities.has(activity.id) ? 'bg-yellow-200 border-yellow-400' : ''
                }`
              },
                React.createElement('td', { className: "px-3 py-2 font-semibold text-blue-800" }, activity.id),
                React.createElement('td', { 
                  className: `px-3 py-2 ${activity.isPhaseHeader ? 'font-bold' : activity.isPhaseHeader ? '' : 'pl-6'}`
                }, activity.name),
                React.createElement('td', { className: "px-3 py-2 text-green-700 font-medium" }, activity.quantity),
                React.createElement('td', { className: "px-3 py-2" },
                  activity.isPhaseHeader ? 
                    React.createElement('span', { className: "text-center" }, activity.duration) :
                    React.createElement(EditableCell, { 
                      value: activity.duration, 
                      onSave: (newDuration) => handleDurationChange(activity.id, newDuration),
                      type: "number"
                    })
                ),
                React.createElement('td', { className: "px-3 py-2" },
                  activity.isPhaseHeader ? 
                    React.createElement('span', { className: "text-xs" }, new Date(activity.startDate).toLocaleDateString()) :
                    React.createElement(EditableCell, { 
                      value: activity.startDate, 
                      onSave: (newStartDate) => handleStartDateChange(activity.id, newStartDate),
                      type: "date"
                    })
                ),
                React.createElement('td', { className: "px-3 py-2 text-xs" }, new Date(activity.endDate).toLocaleDateString()),
                React.createElement('td', { className: "px-3 py-2" },
                  !activity.isPhaseHeader && React.createElement('div', { className: "flex items-center gap-2" },
                    React.createElement('input', {
                      type: "range",
                      min: "0",
                      max: "100",
                      value: activity.progress,
                      onChange: (e) => updateActivity(activity.id, 'progress', parseInt(e.target.value)),
                      className: "w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    }),
                    React.createElement('span', { className: "text-xs font-medium min-w-8" }, `${activity.progress}%`)
                  )
                ),
                React.createElement('td', { className: "px-3 py-2" },
                  !activity.isPhaseHeader && getStatusIcon(activity.progress)
                ),
                React.createElement('td', { className: "px-3 py-2 text-xs" }, activity.resources),
                React.createElement('td', { className: "px-3 py-2 text-xs" },
                  React.createElement('span', { 
                    className: activity.isCritical ? 'text-red-600 font-semibold' : ''
                  }, activity.remarks)
                )
              )
            )
          )
        )
      )
    ),

    // Legend
    React.createElement('div', { className: "mt-4 bg-white p-4 rounded-lg border border-gray-200" },
      React.createElement('h3', { className: "font-semibold mb-3 text-sm" }, "Phase Legend"),
      React.createElement('div', { className: "grid grid-cols-3 gap-3 text-xs" },
        Object.entries(phaseColors).map(([phase, color]) =>
          React.createElement('div', { key: phase, className: "flex items-center gap-2" },
            React.createElement('div', { className: `w-4 h-4 rounded ${color}` }),
            React.createElement('span', { className: "capitalize" }, phase.replace(/([A-Z])/g, ' $1').trim())
          )
        )
      ),
      React.createElement('div', { className: "mt-3 pt-3 border-t border-gray-200" },
        React.createElement('p', { className: "text-xs text-gray-600" },
          React.createElement('span', { className: "font-semibold" }, "Critical Path Activities:"),
          " Activities with red left border are on the critical path. Any delay will directly impact project completion. ",
          React.createElement('span', { className: "font-semibold ml-2" }, "Interactive Features:"),
          " Click edit icons to modify dates and durations. Use progress sliders to update completion status. Dependencies automatically cascade when dates change."
        )
      )
    )
  );
};

// Render the component
ReactDOM.render(React.createElement(PipelineScheduleTracker), document.getElementById('root'));