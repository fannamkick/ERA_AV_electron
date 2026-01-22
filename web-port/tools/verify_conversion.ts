#!/usr/bin/env ts-node
/**
 * 변환 완료 검증 도구
 * ERB → TypeScript 변환이 완전히 이루어졌는지 확인합니다.
 */

import * as fs from 'fs';
import * as path from 'path';

interface VerificationResult {
  feature: string;
  description: string;
  totalRequired: number;
  totalConverted: number;
  missing: string[];
  completionRate: number;
  status: 'complete' | 'incomplete' | 'not_started';
}

// 분석 데이터 로드
const analysisPath = path.join(__dirname, '../analysis/feature_dependencies.json');
const dependencies = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'));

class ConversionVerifier {
  private results: VerificationResult[] = [];

  /**
   * 조교 시스템 검증
   */
  verifyTrainingSystem(): VerificationResult {
    const feature = dependencies.training_system;
    const requiredFiles = feature.required_files as string[];

    // COMF0~COMF92까지 필요한 파일 목록
    const comfFiles: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const file = requiredFiles.find(f => f.includes(`COMF${i}.ERB`));
      if (file) comfFiles.push(file);
    }

    // commandRegistry 확인
    const commandRegistryPath = path.join(__dirname, '../src/modules/training/commands/index.ts');
    let convertedCommands: number[] = [];

    if (fs.existsSync(commandRegistryPath)) {
      const content = fs.readFileSync(commandRegistryPath, 'utf-8');
      // commandRegistry에 등록된 커맨드 ID 추출
      const matches = content.matchAll(/(\d+):\s*{/g);
      convertedCommands = Array.from(matches).map(m => parseInt(m[1]));
    }

    // 필요한 커맨드 번호 추출
    const requiredCommands = comfFiles.map(f => {
      const match = f.match(/COMF(\d+)\.ERB/);
      return match ? parseInt(match[1]) : -1;
    }).filter(n => n >= 0);

    const missing = requiredCommands
      .filter(id => !convertedCommands.includes(id))
      .map(id => `COMF${id}.ERB`);

    const completionRate = requiredCommands.length > 0
      ? (convertedCommands.filter(id => requiredCommands.includes(id)).length / requiredCommands.length) * 100
      : 0;

    return {
      feature: 'training_system',
      description: feature.description,
      totalRequired: requiredCommands.length,
      totalConverted: convertedCommands.filter(id => requiredCommands.includes(id)).length,
      missing,
      completionRate,
      status: completionRate === 100 ? 'complete' : completionRate > 0 ? 'incomplete' : 'not_started'
    };
  }

  /**
   * 파라미터 시스템 검증
   */
  verifyParameterSystem(): VerificationResult {
    const feature = dependencies.parameter_system;
    const requiredIndices = feature.required_indices as number[];

    // types/parameters.ts 또는 data/parameters.ts 확인
    const possiblePaths = [
      path.join(__dirname, '../src/types/parameters.ts'),
      path.join(__dirname, '../src/data/parameters.ts'),
      path.join(__dirname, '../src/constants/parameters.ts')
    ];

    let convertedIndices: number[] = [];
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        // PALAM 인덱스 추출 (예: PALAM[0], id: 0 등)
        const matches = content.matchAll(/(?:PALAM\[|id:\s*)(\d+)/g);
        convertedIndices = Array.from(matches).map(m => parseInt(m[1]));
        break;
      }
    }

    const missing = requiredIndices
      .filter(id => !convertedIndices.includes(id))
      .map(id => `PALAM[${id}]`);

    const completionRate = requiredIndices.length > 0
      ? (requiredIndices.filter(id => convertedIndices.includes(id)).length / requiredIndices.length) * 100
      : 0;

    return {
      feature: 'parameter_system',
      description: feature.description,
      totalRequired: requiredIndices.length,
      totalConverted: requiredIndices.filter(id => convertedIndices.includes(id)).length,
      missing: missing.slice(0, 10), // 처음 10개만
      completionRate,
      status: completionRate === 100 ? 'complete' : completionRate > 0 ? 'incomplete' : 'not_started'
    };
  }

  /**
   * 재능 시스템 검증
   */
  verifyTalentSystem(): VerificationResult {
    const feature = dependencies.talent_system;
    const requiredIndices = feature.required_indices as number[];

    const possiblePaths = [
      path.join(__dirname, '../src/types/talents.ts'),
      path.join(__dirname, '../src/data/talents.ts'),
      path.join(__dirname, '../src/constants/talents.ts')
    ];

    let convertedIndices: number[] = [];
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.matchAll(/(?:TALENT\[|id:\s*)(\d+)/g);
        convertedIndices = Array.from(matches).map(m => parseInt(m[1]));
        break;
      }
    }

    const missing = requiredIndices
      .filter(id => !convertedIndices.includes(id))
      .map(id => `TALENT[${id}]`);

    const completionRate = requiredIndices.length > 0
      ? (requiredIndices.filter(id => convertedIndices.includes(id)).length / requiredIndices.length) * 100
      : 0;

    return {
      feature: 'talent_system',
      description: feature.description,
      totalRequired: requiredIndices.length,
      totalConverted: requiredIndices.filter(id => convertedIndices.includes(id)).length,
      missing: missing.slice(0, 10),
      completionRate,
      status: completionRate === 100 ? 'complete' : completionRate > 0 ? 'incomplete' : 'not_started'
    };
  }

  /**
   * 플래그 시스템 검증
   */
  verifyFlagSystem(): VerificationResult {
    const feature = dependencies.flag_system;
    const requiredIndices = feature.required_indices as number[];

    const possiblePaths = [
      path.join(__dirname, '../src/types/flags.ts'),
      path.join(__dirname, '../src/data/flags.ts'),
      path.join(__dirname, '../src/constants/flags.ts')
    ];

    let convertedIndices: number[] = [];
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.matchAll(/(?:FLAG\[|id:\s*)(\d+)/g);
        convertedIndices = Array.from(matches).map(m => parseInt(m[1]));
        break;
      }
    }

    const missing = requiredIndices
      .filter(id => !convertedIndices.includes(id))
      .map(id => `FLAG[${id}]`);

    const completionRate = requiredIndices.length > 0
      ? (requiredIndices.filter(id => convertedIndices.includes(id)).length / requiredIndices.length) * 100
      : 0;

    return {
      feature: 'flag_system',
      description: feature.description,
      totalRequired: requiredIndices.length,
      totalConverted: requiredIndices.filter(id => convertedIndices.includes(id)).length,
      missing: missing.slice(0, 10),
      completionRate,
      status: completionRate === 100 ? 'complete' : completionRate > 0 ? 'incomplete' : 'not_started'
    };
  }

  /**
   * 모든 검증 실행
   */
  verifyAll(): void {
    console.log('='.repeat(60));
    console.log('변환 완료 검증');
    console.log('='.repeat(60));

    this.results = [
      this.verifyTrainingSystem(),
      this.verifyParameterSystem(),
      this.verifyTalentSystem(),
      this.verifyFlagSystem()
    ];

    this.printResults();
    this.saveResults();
  }

  /**
   * 결과 출력
   */
  private printResults(): void {
    console.log('\n검증 결과:\n');

    for (const result of this.results) {
      const statusIcon = result.status === 'complete' ? '[OK]' :
                        result.status === 'incomplete' ? '[WARN]' : '[TODO]';

      console.log(`${statusIcon} ${result.feature}`);
      console.log(`    ${result.description}`);
      console.log(`    진행률: ${result.completionRate.toFixed(1)}% (${result.totalConverted}/${result.totalRequired})`);

      if (result.missing.length > 0) {
        console.log(`    누락: ${result.missing.slice(0, 5).join(', ')}${result.missing.length > 5 ? ` 외 ${result.missing.length - 5}개` : ''}`);
      }
      console.log('');
    }

    // 전체 요약
    const totalComplete = this.results.filter(r => r.status === 'complete').length;
    const totalIncomplete = this.results.filter(r => r.status === 'incomplete').length;
    const totalNotStarted = this.results.filter(r => r.status === 'not_started').length;

    console.log('='.repeat(60));
    console.log('전체 요약');
    console.log('='.repeat(60));
    console.log(`완료: ${totalComplete}`);
    console.log(`진행 중: ${totalIncomplete}`);
    console.log(`미시작: ${totalNotStarted}`);

    const overallCompletion = this.results.reduce((sum, r) => sum + r.completionRate, 0) / this.results.length;
    console.log(`전체 진행률: ${overallCompletion.toFixed(1)}%`);
    console.log('='.repeat(60));
  }

  /**
   * 결과 저장
   */
  private saveResults(): void {
    const outputPath = path.join(__dirname, '../analysis/conversion_status.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      results: this.results
    }, null, 2));

    console.log(`\n결과 저장: ${outputPath}`);
  }
}

// 실행
const verifier = new ConversionVerifier();
verifier.verifyAll();
